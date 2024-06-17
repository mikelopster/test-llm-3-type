import json
import sys

def get_data(api_data):
    try:
        api_data_dict = json.loads(api_data)
    except json.JSONDecodeError:
        print("Error: Invalid JSON data received from API")
        sys.exit(1)  # Exit with an error code

    # 2. Use API Data in Your Logic
    new_products = [
        {"id": 2, "name": "New Product A"},
        {"id": 3, "name": "New Product B"}
    ]
    filtered_products = [p for p in new_products if p["id"]
                         in api_data_dict.get("productIds", [])]

    data = {
        "new_products": filtered_products  # Use filtered products
    }
    return data


# 3. Get API Data from Command-Line Argument
api_data = sys.argv[1]
json_data = json.dumps(get_data(api_data))
print(json_data, end="\n")
