VELVET BITES — LOCAL WEBSITE

Open index.html in your browser to view the website. It works offline;
WhatsApp and Instagram require an internet connection.

TO HOST
Upload index.html, styles.css, settings.js, menu.js, menu-render.js, order.js, seo.js, robots.txt, sitemap.xml
and the assets folder to your
hosting provider's public website folder (often public_html or www).
Keep their relative folder structure. No installation, build process,
database or paid services are required. The form uses browser JavaScript.

CHANGE THE WHATSAPP NUMBER
Open settings.js in a text editor and change this one value:
  whatsappNumber: "919492992488"
Use your full number with country code and digits only (no + or spaces).
Save settings.js and upload the updated file to your host.

TO EDIT
Change general text and the Instagram link in index.html.
Change colors, spacing and layout in styles.css.
The original PDF in assets is a reference only. The website print/save button
uses the current menu; select Save as PDF in your browser to export it.

CONTENT
Current items and prices come from Refined_Menu.xlsx. The corrupted smaller-weight
heading is interpreted as half kg. Instagram and booking terms come from the original menu. The logo and original PDF are included locally.
The order form opens WhatsApp with the customer's name, phone, item, size, price,
required date, address and optional special notes.
Customers must tap Send in WhatsApp. Opening the chat does not send an order
automatically. Orders remain requests until you confirm them.
The earliest required date is tomorrow, based on the customer's local date.
Today and past dates cannot be submitted.
Customer details are not stored by this website. No payments are collected.
No street address or opening hours were supplied.

EDIT THE MENU WITHOUT WRITING CODE
1. Open menu-editor.html in your browser from the extracted website folder.
2. Change cake names, prices (rupees for half kg, 1 kg or one piece) or categories.
3. Use Add cake or Remove to change the selection.
4. Click Download updated menu.
5. Move the downloaded file into the website folder, replacing menu.js.
   If your browser named it menu (1).js, rename it to menu.js.
6. Reload index.html to verify. Both the menu and order dropdown update.
7. If hosted, upload the replacement menu.js and refresh the live page.

Keep menu-editor.html and menu-editor.js locally; they need not be uploaded.
The editor does not update hosting automatically and requires no password
because it only edits a local copy and exports a file. Close/reopen the editor
or reload it after replacing menu.js to load the saved changes.
Use unique item names within each category, positive prices, and consistent category
spelling. Leave unavailable size prices blank. Enter at least one price per item. You may also edit menu.js directly in a text editor.

MENU TABS
Category tabs are generated automatically from menu.js. Adding a new category
in the menu editor creates its tab. Printing includes every category.

LINKED ORDER DROPDOWNS
Choose Category, then Cake / item, then Size and price. All three use menu.js.
Changing a category or item clears the previous dependent selections.
WhatsApp includes the category, item, size and listed price.

SEARCH ENGINE SETUP
The page includes a descriptive local title, description, social-sharing text,
and Bakery/menu structured data. Menu schema reads current menu.js prices.
Keep seo.js with the other website files. Keep menu-editor.html locally;
it already has noindex so search engines should not list the editor.

Canonical URL, sitemap.xml and robots.txt are configured for https://velvetbites.in/.
Upload them to the website root. Use HTTPS and redirect alternate www or HTTP
addresses to your chosen https://velvetbites.in/ address in your hosting settings.
After launch: verify the website in Google Search Console, submit the sitemap,
and request indexing. Test structured data with Google's Rich Results Test.
Add your actual street address and opening hours only when confirmed.
Local-business rich result eligibility is not verified with the partial address.
A Google Business Profile can support local discovery if your business is eligible.
SEO improvements do not guarantee indexing or rankings.
