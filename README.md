# Flipped Cinematic Launcher

Build a premium desktop launcher UI for a project called **PROJECT FLIPPED**.

IMPORTANT:
- This is **UI ONLY**.
- Do not build the backend, authentication, matchmaking, game launching, Discord OAuth, or APIs.
- Use mock/static data for now.
- The final UI should be structured so we can connect a real backend later.
- The design should feel like a polished modern gaming launcher, inspired by the quality and cleanliness of launchers such as Project Stellar, but **do not copy their exact design, branding, layout, or assets**.
- The entire interface should be **black / near-black**, minimal, futuristic, and premium.
- Avoid bright colorful gradients.
- Do NOT make it look like a generic AI-generated dashboard.

## BRAND

Name:
**PROJECT FLIPPED**

Style:
- Black
- Dark charcoal
- Metallic silver
- White text
- Very subtle gray borders
- Minimal accent color
- Premium gaming aesthetic
- Cinematic
- Lots of negative space
- Sharp but slightly rounded UI elements
- Smooth animations
- No excessive glow

Use a modern condensed display font for major headings and a clean sans-serif font for normal UI text.

## HERO IMAGE

Use the uploaded black-and-silver futuristic humanoid image as the primary hero artwork.

The image should be displayed prominently on the Home page.

Do NOT distort the image.

Use it as a large cinematic background/hero visual with:
- dark black blending around the edges
- subtle vignette
- subtle gradient overlay so text remains readable
- slow, very subtle background movement/parallax if possible

The character should remain the visual centerpiece.

## MAIN NAVIGATION

Create a left-side vertical navigation rail.

Navigation items:

- HOME
- LIBRARY
- SHOP
- LEADERBOARD
- NEWS
- SETTINGS

At the very top:

**PROJECT FLIPPED**

Use a simple minimal FLIPPED logo/wordmark.

At the bottom:

- User profile
- Discord-style avatar placeholder
- Username
- Online status

Example:

FLIPPED
@Player
● ONLINE

The navigation should have smooth hover animations and a subtle active-state indicator.

## HOME PAGE

The Home page should be the primary landing screen.

Large hero section:

PROJECT FLIPPED

CHAPTER 3
SEASON 1

Use the uploaded futuristic humanoid image behind/next to the hero content.

Main button:

**PLAY NOW**

Secondary button:

**VIEW LIBRARY**

Below the hero:

### SERVER STATUS

Show three small status cards:

NA-EAST
ONLINE
32 MS

EU
ONLINE
87 MS

NA-WEST
ONLINE
54 MS

These are mock values for now.

### LATEST UPDATE

Create a clean update card:

PROJECT FLIPPED
VERSION 1.0.0

"Chapter 3 Season 1 is now available."

Button:
VIEW UPDATE

### NEWS

Show 3 small news cards with image placeholders and titles.

## LIBRARY PAGE

Create a dedicated Library page.

Header:

LIBRARY

Subtitle:
"Your Project Flipped builds"

Large game/build card:

PROJECT FLIPPED
CHAPTER 3 — SEASON 1

Status:
READY TO PLAY

Buttons:

PLAY
VERIFY FILES
MANAGE

Include:
- Version number
- Installed status
- Installation location
- Last updated
- Storage size

Add a progress bar component that can later be connected to the real updater.

## SHOP PAGE

Create a black premium storefront.

Header:

SHOP

Subtitle:
"Customize your Flipped experience."

Create product cards with placeholder items.

Categories:
- FEATURED
- COSMETICS
- BUNDLES
- OTHER

Each product card should contain:
- Large artwork placeholder
- Product name
- Rarity
- Price
- BUY button

Keep everything monochrome and premium.

Use subtle silver/gray accents instead of colorful Fortnite-style UI.

## LEADERBOARD PAGE

Create a dedicated competitive leaderboard.

Header:

LEADERBOARD

Subtitle:
"Top players in Project Flipped"

At the top create tabs:

GLOBAL
NA-EAST
EU
NA-WEST

Leaderboard rows should include:

RANK
PLAYER
WINS
KILLS
MATCHES
POINTS

Example mock players:

01   PlayerOne       142   981   320   2840
02   Flipped         131   914   301   2675
03   Shadow          119   842   288   2490

Highlight the user's own row with a subtle border.

Do not use bright gold/silver/bronze colors. Keep the leaderboard monochrome.

## NEWS PAGE

Create a clean news feed.

Large featured article at the top.

Smaller news cards underneath.

Each card should have:
- image
- date
- category
- title
- short description

## SETTINGS PAGE

Create settings categories:

GENERAL
- Launch on startup
- Minimize to tray
- Animations

GAME
- Fortnite installation path
- Preferred region
- Auto-update
- Verify files

APPEARANCE
- Dark mode
- Background effects
- Reduce animations

ABOUT
- Project Flipped version
- Website
- Discord
- Credits

## TOP BAR

The top-right of the launcher should contain:

Server status:
● ALL SYSTEMS OPERATIONAL

User:
@Player

Settings icon

Window controls:
MINIMIZE
MAXIMIZE
CLOSE

Make the launcher feel like a real Windows desktop application.

## ANIMATIONS

Use subtle high-quality animations:

- page transitions
- navigation hover effects
- card hover effects
- button hover effects
- hero image parallax
- fade/slide transitions
- loading animations
- progress bar animation

Animations should be smooth and restrained.

Do NOT make everything bounce or glow.

## DESIGN RULES

The entire launcher should feel:

"dark futuristic gaming launcher"

not:

"website dashboard"

Use:
- black backgrounds
- #080808 / #0d0d0d / #141414 style surfaces
- thin borders
- white typography
- gray secondary text
- metallic/silver imagery
- subtle shadows
- large cinematic artwork
- clean spacing

Avoid:
- purple gradients
- neon rainbow colors
- excessive glassmorphism
- excessive rounded cards
- generic SaaS dashboard styling
- huge colorful buttons
- cartoon styling

## RESPONSIVE DESKTOP DESIGN

This is a **desktop launcher**, not a mobile website.

Optimize primarily for:
1920×1080
2560×1440
1366×768

The interface should scale correctly while maintaining the cinematic composition.

## FUTURE BACKEND INTEGRATION

Structure the frontend cleanly so these can be connected later:

- Discord authentication
- Project Flipped account
- LawinServer backend
- FortMatchmaker
- Regional servers
- Real server ping
- Real player counts
- Real leaderboard
- Real shop
- Real news
- Build updater
- Game launching

For now, use mock data and clearly separated components/services.

The final result should look like a **real premium Project Flipped launcher**, not a website.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6446ef99-f30f-45d4-b0a3-b954a5aef06f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
