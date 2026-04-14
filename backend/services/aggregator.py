def merge_results(results):

    merged = {"themes": []}
    theme_map = {}

    for res in results:
        for theme in res.get("themes", []):
            name = theme["name"]

            if name not in theme_map:
                theme_map[name] = {"name": name, "insights": []}

            theme_map[name]["insights"].extend(theme["insights"])

    merged["themes"] = list(theme_map.values())
    return merged