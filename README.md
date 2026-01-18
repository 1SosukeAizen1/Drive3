# Drive1

Menu app with in-browser editor and image overrides. No external menu.json is required anymore.

Editing is now on a separate page:
- Open index.html to view the live menu (no edit UI).
- Click the Edit link (top-right) or open editor.html to make changes.

Quick visual editing (no JSON) on editor.html:
- Click the "Quick Edit" button.
- Directly click into any item name, description, or price to edit it.
- Use + Item to add items within a category, × to delete an item.
- Use Rename/Delete on a category, or + Category at the top to add new categories.
- You can also add/edit/delete special banners (like Dipping Sauces) with + Banner and edit their title, text, and price.
- You can add simple "New" highlight banners with + New and edit their key, text, and price.
- Click "Save Visual" to save changes to this browser (localStorage), or "Cancel" to discard.

JSON editor (advanced) on editor.html:
- Click the "Edit Menu" button to open the JSON editor if you prefer editing the raw JSON.
- Click "Save" to store your changes in this browser (localStorage) and re-render immediately.
- Click "Reset" to clear your browser's saved menu and restore the built-in defaults.
- Click "Export" to download the current menu JSON.
- Click "Import" to load a JSON file and apply it.

Managing images (icons/background) on editor.html:
- Click the "Images" button to open the Images Manager.
- Choose Type = Category Icon and enter a Category name, then select an image file to override that category's icon.
- Or choose Type = Background and select an image file to override the page background.
- Click "Export" to download your image overrides as JSON (Data URLs inside).
- Click "Import" to load overrides from a previous export.
- Click "Clear" to remove all image overrides stored in this browser.

Notes:
- All edits and images are saved in your browser (localStorage). To share them with others, export and commit the JSON files or import them in another browser.
- The page may auto-reload when new commits are detected (to update any built-in defaults).