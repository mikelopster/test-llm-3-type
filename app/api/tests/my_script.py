import json

def get_data():
    # Replace this with your actual logic to fetch or generate the product data
    data = {
        "new_products": [
            {"id": 2, "name": "New Product A"},
            {"id": 3, "name": "New Product B"}
        ]
    }
    return data

# Convert data to JSON string
json_data = json.dumps(get_data())

# Print JSON data. Ensure there's a trailing newline for proper parsing
print(json_data, end='\n')