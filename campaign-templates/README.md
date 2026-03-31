# Campaign Website Templates

Ready-to-use website templates for down-ballot political candidates — school board through state legislature. No frameworks, no build tools — just HTML, CSS, and vanilla JavaScript.

**Two templates included:**

- **`single-page/`** — Modern single-page site with smooth scroll navigation. All content on one page.
- **`multi-page/`** — Traditional multi-page site with separate pages for issues, endorsements, events, donate, and contact/volunteer.

Both templates are fully responsive (desktop, tablet, mobile), use the same color palette system, and are designed to be customized in under 30 minutes by editing a single JSON file.

---

## Quick Start

1. Pick a template (`single-page/` or `multi-page/`)
2. Copy the template folder — this becomes your candidate's site
3. Open `content.json` and replace the placeholder content with your own
4. Open `index.html` in a browser to preview
5. Host it for free on GitHub Pages (see instructions at the bottom)

---

## How to Customize

All customization is done by editing **one file**: `content.json`. This file controls the candidate info, issues, endorsements, events, contact info, colors, and fonts. No need to touch the HTML.

### 1. Open `content.json`

Open `content.json` in any text editor (VS Code, Notepad, TextEdit, etc.). You'll see a structured file with all the site content organized into sections.

### 2. Replace Candidate Info

Update the `candidate` section with your candidate's details:

```json
{
  "candidate": {
    "name": "Jane Smith",
    "office": "Candidate for City Council — District 5",
    "tagline": "Building a stronger community for every family.",
    "navBrand": "Smith for Council",
    "heroImage": "",
    "aboutImage": ""
  }
}
```

- **`name`** — Candidate's full name (appears in the hero section)
- **`office`** — Office being sought (appears above the name)
- **`tagline`** — Campaign slogan (appears below the name)
- **`navBrand`** — Short name for the navigation bar (e.g., "Smith for Council")
- **`heroImage`** — Path to hero photo (e.g., `"images/candidate-hero.jpg"`). Leave empty for placeholder.
- **`aboutImage`** — Path to about photo. Leave empty for placeholder.

### 3. Update Site Metadata

```json
{
  "site": {
    "title": "Jane Smith for City Council",
    "metaDescription": "Jane Smith is running for City Council..."
  }
}
```

### 4. Edit the About Section

```json
{
  "about": {
    "title": "Meet Jane",
    "paragraphs": [
      "First paragraph of bio...",
      "Second paragraph...",
      "Third paragraph..."
    ]
  }
}
```

### 5. Update Issues

Add, remove, or edit issue cards in the `issues.items` array:

```json
{
  "issues": {
    "title": "Priorities",
    "items": [
      {
        "icon": "\ud83c\udfeb",
        "title": "Better Schools",
        "description": "Short description shown on the card.",
        "detail": "Longer description shown on the multi-page issues page."
      }
    ]
  }
}
```

### 6. Update Endorsements

```json
{
  "endorsements": {
    "items": [
      {
        "quote": "Endorsement quote text...",
        "name": "Mayor Robert Chen",
        "title": "Mayor, City of Springfield"
      }
    ]
  }
}
```

### 7. Update Events

```json
{
  "events": {
    "items": [
      {
        "month": "Apr",
        "day": "12",
        "title": "Community Town Hall",
        "time": "6:00 PM – 8:00 PM",
        "location": "Community Center, 123 Oak St",
        "description": "Event description..."
      }
    ]
  }
}
```

### 8. Set Donation and Volunteer Links

```json
{
  "donate": {
    "url": "https://example.com/donate",
    "title": "Support the Campaign",
    "description": "Your donation message..."
  },
  "volunteer": {
    "signupUrl": "https://example.com/volunteer-signup"
  }
}
```

Replace the URLs with your actual donation platform (ActBlue, Anedot, WinRed) and volunteer signup form (Google Forms, etc.).

### 9. Set Contact Info and Social Media

```json
{
  "contact": {
    "email": "info@smithforcouncil.com",
    "phone": "(555) 123-4567",
    "address": {
      "street": "456 Main Street",
      "city": "Springfield, ST 12345"
    }
  },
  "social": {
    "facebook": "https://facebook.com/smithforcouncil",
    "twitter": "https://twitter.com/smithforcouncil",
    "instagram": "https://instagram.com/smithforcouncil"
  }
}
```

### 10. Update the Legal Disclaimer

```json
{
  "disclaimer": "Paid for by Friends of Jane Smith. Not authorized by any other candidate or committee."
}
```

This is legally required for campaign websites. Replace with your actual committee name.

### 11. Change the Color Palette

The `theme` section controls colors and fonts:

```json
{
  "theme": {
    "palette": "navy-red",
    "headingFont": "Merriweather",
    "bodyFont": "Inter",
    "googleFontsUrl": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@700;800;900&display=swap"
  }
}
```

**Available palettes:**

| Palette Name | `palette` value | Colors | Best For |
|---------|---------|---------|----------|
| Classic Navy & Red | `"navy-red"` | Navy blue + Red | Traditional, bipartisan, authoritative |
| Modern Blue & Copper | `"blue-gold"` | Bright blue + Amber | Clean, optimistic, contemporary |
| Forest Green & Cream | `"green-cream"` | Forest green + Warm amber | Rural, environmental, independent |
| Slate & Teal | `"slate-teal"` | Slate gray + Teal | Modern, professional, nonpartisan |

**Custom colors:** Set `"palette": "custom"` and add a `"colors"` object:

```json
{
  "theme": {
    "palette": "custom",
    "colors": {
      "primary": "#1B3A5C",
      "primary-dark": "#122840",
      "primary-light": "#E8EEF4",
      "secondary": "#C42032",
      "secondary-dark": "#9A1826",
      "text": "#1a1a1a",
      "text-light": "#555555",
      "bg": "#ffffff",
      "bg-alt": "#f5f7fa",
      "white": "#ffffff"
    }
  }
}
```

### 12. Change Fonts

To use different fonts:

1. Go to [fonts.google.com](https://fonts.google.com) and pick a heading font and body font
2. Get the embed URL (click "Get embed code" and copy the `<link>` href)
3. Update the `theme` section:

```json
{
  "theme": {
    "headingFont": "Playfair Display",
    "bodyFont": "Source Sans Pro",
    "googleFontsUrl": "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Source+Sans+Pro:wght@400;600;700&display=swap"
  }
}
```

**Suggested pairings:**
- Playfair Display + Source Sans Pro (elegant)
- Libre Baskerville + Open Sans (classic)
- Lora + Nunito Sans (friendly)

### 13. Replace Images

Each template has placeholder divs where images go. To add your actual photos:

1. Put your image files in the `images/` folder
2. In `content.json`, set the image paths:

```json
{
  "candidate": {
    "heroImage": "images/candidate-hero.jpg",
    "aboutImage": "images/candidate-about.jpg"
  }
}
```

**Recommended image sizes:**
- Hero photo: 600 x 750px (portrait)
- About photo: 500 x 600px (portrait)

---

## File Structure

```
campaign-templates/
├── single-page/
│   ├── index.html          ← HTML shell (populated by JS)
│   ├── content.json        ← ALL content lives here — edit this file!
│   ├── css/styles.css      ← Styles + color palette definitions
│   ├── js/main.js          ← Loads content.json, renders everything
│   └── images/             ← Put your photos here
│
├── multi-page/
│   ├── index.html          ← Home: hero + about
│   ├── issues.html         ← Issues/priorities
│   ├── endorsements.html   ← Endorsement quotes
│   ├── events.html         ← Upcoming events list
│   ├── donate.html         ← Dedicated donate page
│   ├── contact.html        ← Contact info + volunteer CTA
│   ├── content.json        ← ALL content lives here — edit this file!
│   ├── css/styles.css      ← Styles + color palette definitions
│   ├── js/main.js          ← Loads content.json, renders per page
│   └── images/             ← Put your photos here
│
└── README.md               ← This file
```

---

## How to Put Your Website Online (Free)

You can host your campaign website for free using GitHub Pages. This guide will walk you through every step — no technical experience needed.

### Step 1: Create a GitHub Account

1. Open your web browser and go to **github.com**
2. Click the **"Sign up"** button in the top-right corner
3. Enter your **email address** and click Continue
4. Create a **password** (at least 8 characters) and click Continue
5. Choose a **username** — this is important because your website address will be `username.github.io`. Pick something professional related to the campaign, like:
   - `smith4council`
   - `smithforschoolboard`
   - `janesmith2026`
   - Avoid usernames like `xXgamer99Xx` — voters will see this URL!
6. Complete the account verification (solve the puzzle) and click **"Create account"**
7. Check your email for a verification code, enter it on the screen
8. You now have a GitHub account!

### Step 2: Create a New Repository

A "repository" is just a folder on GitHub that holds your website files.

1. After logging in, look at the top-right corner of the page. You'll see a **"+"** button. Click it.
2. Click **"New repository"**
3. You'll see a form. Fill it out:
   - **Repository name:** Type your username followed by `.github.io` — for example, if your username is `smith4council`, type `smith4council.github.io`. This exact name is what tells GitHub to turn it into a website.
   - **Description:** (Optional) Something like "Campaign website for Jane Smith"
   - **Public/Private:** Make sure **"Public"** is selected (the circle next to "Public" should be filled in). Your site needs to be public so voters can see it.
   - **"Add a README file":** Check this box (click the little checkbox)
4. Click the green **"Create repository"** button at the bottom

You'll now see your new repository page. It will mostly be empty with just a README file.

### Step 3: Upload Your Website Files

1. On your repository page, look for the **"Add file"** button (it's a dropdown button near the top of the file list). Click it.
2. Click **"Upload files"**
3. You'll see a large area that says "Drag files here." Open the folder on your computer that has your website files (the one with `index.html`, `content.json`, the `css` folder, the `js` folder, and the `images` folder)
4. **Select ALL the files and folders** inside your website folder and drag them into that area on the GitHub page. You can also click "choose your files" to browse and select them.

   **IMPORTANT:** Your `index.html` and `content.json` files must end up in the **root** (top level) of the repository — NOT inside a subfolder.

5. Scroll down. You'll see a section called **"Commit changes."** In the text box, type something like: `Add website files`
6. Make sure **"Commit directly to the main branch"** is selected
7. Click the green **"Commit changes"** button

Wait a moment for the files to upload. You should now see all your website files listed in the repository.

### Step 4: Enable GitHub Pages

1. On your repository page, look for the **"Settings"** tab at the top (it has a gear icon). Click it.
2. On the left sidebar, scroll down and click **"Pages"**
3. You'll see a section called **"Build and deployment"**
4. Under **"Source"**, make sure it says **"Deploy from a branch"**
5. Under **"Branch"**, click the dropdown that probably says "None" and select **"main"**
6. The folder dropdown next to it should say **"/ (root)"** — leave it as is
7. Click **"Save"**

That's it! GitHub is now building your website. It takes **1 to 5 minutes** for the site to go live.

### Step 5: View Your Live Website

1. Stay on the Pages settings page and **wait a couple of minutes**
2. Refresh the page. You should see a message at the top that says **"Your site is live at https://username.github.io"** with a green checkmark and a **"Visit site"** button
3. Click **"Visit site"** — or type `https://username.github.io` in your browser (replace `username` with your actual GitHub username)
4. You should see your campaign website live on the internet!

**Be patient** — the first time, it can take up to 5 minutes. If it doesn't show up right away, wait a few minutes and refresh.

### Step 6: Connect a Custom Domain (Optional)

Instead of `username.github.io`, you can use a custom domain like `smithforcouncil.com`. This looks more professional on campaign materials.

**Buy a domain:**
1. Go to a domain registrar. Beginner-friendly options:
   - **Namecheap** (namecheap.com) — affordable, easy to use
   - **Google Domains** (domains.google) — simple interface
   - **GoDaddy** (godaddy.com) — well-known, lots of support
2. Search for the domain name you want (e.g., `smithforcouncil.com`)
3. Buy it — domains typically cost $10-15/year

**Connect it to GitHub Pages:**
1. Go to your repository on GitHub
2. Click **Settings** > **Pages** (in the left sidebar)
3. Under **"Custom domain"**, type your domain name (e.g., `smithforcouncil.com`) and click **Save**
4. Now go to your domain registrar's website (where you bought the domain)
5. Find the **DNS settings** or **DNS management** page for your domain
6. Add a **CNAME record**:
   - **Type:** CNAME
   - **Name/Host:** `www`
   - **Value/Target:** `username.github.io` (your GitHub Pages URL)
7. Also add these **A records** (for the root domain without www):
   - **Type:** A, **Value:** `185.199.108.153`
   - **Type:** A, **Value:** `185.199.109.153`
   - **Type:** A, **Value:** `185.199.110.153`
   - **Type:** A, **Value:** `185.199.111.153`

**Note:** DNS changes can take **up to 24-48 hours** to work. Be patient!

Once the domain is connected, go back to GitHub Pages settings and check the box for **"Enforce HTTPS"** — this makes your site secure (shows the padlock icon in browsers).

### Step 7: Update Your Site Later

Want to change something on your website? Just edit `content.json`:

1. Go to your repository on github.com
2. Click on `content.json`
3. Click the **pencil icon** (edit button) in the top-right area of the file
4. Make your changes (update text, add events, change colors, etc.)
5. Scroll down and click **"Commit changes"**
6. Your site will automatically update within a minute or two!

**To replace an image:**
1. Go to your repository and navigate to the `images/` folder
2. Click on the image file you want to replace
3. Click the **three dots** menu (top-right) and select **"Delete file"**
4. Commit the deletion
5. Go back to the `images/` folder, click **"Add file" > "Upload files"**
6. Upload the new image with **the exact same filename** as the old one
7. Commit the upload

### Step 8: Troubleshooting

**"My site shows the README instead of my website"**
- Your `index.html` is probably inside a subfolder instead of at the root of the repository. It needs to be at the top level — when you look at your repository's file list, `index.html` should be right there, not inside another folder.

**"My site isn't showing up at all"**
- Double-check that the repository name is exactly `username.github.io` (replace `username` with your actual GitHub username)
- Go to Settings > Pages and make sure the source is set to "Deploy from a branch" with the "main" branch selected
- Wait 5 minutes and try refreshing the page

**"My content isn't loading / site looks empty"**
- Make sure `content.json` is in the same folder as `index.html`
- Check that `content.json` is valid JSON — a missing comma or quote can break it. Use [jsonlint.com](https://jsonlint.com) to validate your JSON.
- Open the browser's developer console (F12) to check for error messages

**"My images aren't loading"**
- Check that the image filenames in `content.json` match the actual filenames exactly — **capitalization matters!** `Candidate-Hero.jpg` is different from `candidate-hero.jpg`
- Make sure the images are inside the `images/` folder

**"My CSS isn't loading / site looks unstyled"**
- Check that the `css` folder is in the same directory as your `index.html`

**"The fonts look wrong / aren't loading"**
- The fonts load from Google Fonts, which requires an internet connection. They won't work if you're offline.
- Make sure the `googleFontsUrl` in your `content.json` theme section is correct

---

## Need Help?

If you run into trouble, common resources:
- **GitHub Pages documentation:** docs.github.com/en/pages
- **JSON validator:** jsonlint.com (paste your content.json to check for errors)
- **W3Schools HTML/CSS reference:** w3schools.com (great for beginners)
- Search your error message on Google — someone has almost certainly had the same issue!
