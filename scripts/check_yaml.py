import os
import yaml
import sys

def load_required_fields(yaml_path):
    with open(yaml_path, 'r') as f:
        data = yaml.safe_load(f)
    # Support both list or dict format in YAML
    if isinstance(data, dict):
        return list(data.keys())
    elif isinstance(data, list):
        return data
    else:
        raise ValueError("YAML format must be a list or dictionary.")

def extract_frontmatter(md_file_path):
    with open(md_file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    if lines[0].strip() != '---':
        return None  # No YAML frontmatter

    frontmatter_lines = []
    for line in lines[1:]:
        if line.strip() == '---':
            break
        frontmatter_lines.append(line)

    try:
        return yaml.safe_load(''.join(frontmatter_lines)) or {}
    except yaml.YAMLError as e:
        print(f"YAML parse error in file: {md_file_path}")
        return {}

def find_md_files(folder):
    for root, _, files in os.walk(folder):
        for file in files:
            if file.endswith('.md'):
                yield os.path.join(root, file)

def check_metadata(yaml_path, folder_path):
    required_fields = load_required_fields(yaml_path)
    missing_report = {}

    for md_file in find_md_files(folder_path):
        metadata = extract_frontmatter(md_file)
        if metadata is None:
            missing_report[md_file] = required_fields
        else:
            missing = [field for field in required_fields if field not in metadata]
            if missing:
                missing_report[md_file] = missing

    return missing_report

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python check_metadata_fields.py <required_fields.yml> <folder_path>")
        sys.exit(1)

    yaml_file = "required_fields.yaml"
    folder = "C:\\Users\\JonathanAulson\\Documents\\Projects\\Data_Product_TownePark"

    results = check_metadata(yaml_file, folder)

    if not results:
        print("✅ All Markdown files have the required metadata fields.")
    else:
        print("❌ Missing metadata fields:")
        for path, fields in results.items():
            print(f"- {path} is missing: {', '.join(fields)}")
