import json
import os

def create_content():
    base_path = os.path.join(os.path.dirname(__file__), "physical-ai-book", "docs")
    with open("syllabus_data.json", "r") as f:
        data = json.load(f)

    # Prepare component imports
    imports = "import PersonalizeButton from '@site/src/components/PersonalizeButton';\nimport TranslateButton from '@site/src/components/TranslateButton';\n\n<PersonalizeButton /> <TranslateButton />\n\n"

    # 1. Intro
    intro_path = os.path.join(base_path, "intro.md")
    if not os.path.exists(base_path):
        print(f"Waiting for Docusaurus... {base_path} not found.")
        return

    with open(intro_path, "w") as f:
        f.write("---\nsidebar_position: 1\n---\n\n" + imports + data["intro"]["content"])

    # 2. Modules
    for i, module in enumerate(data["modules"]):
        mod_dir = os.path.join(base_path, module["id"])
        if not os.path.exists(mod_dir):
            os.makedirs(mod_dir)
        
        # Module Index/Intro
        with open(os.path.join(mod_dir, "index.md"), "w") as f:
             f.write(f"# {module['title']}\n\n{imports}Overview of this module.")

        # Pages
        for page in module["pages"]:
            page_path = os.path.join(mod_dir, f"{page['slug']}.md")
            with open(page_path, "w") as f:
                f.write(f"# {page['title']}\n\n{imports}{page['content']}")
    
    print("Content generated successfully.")

if __name__ == "__main__":
    create_content()
