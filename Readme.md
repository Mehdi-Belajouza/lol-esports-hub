# Arabian League


The Arabian League project is an esports-focused platform designed to showcase and highlight players and teams within the Arabian esports scene. Inspired by professional standards like the EWC website, this project aims to provide a comprehensive and polished overview of the league, its players, and teams.




# 🎮 Esports Hub - Professional Gaming Platform

<div align="center">

![Esports Hub Banner](https://esports-news.co.uk/wp-content/uploads/2024/07/esports-world-cup-trophy-thomas-lyte.jpg)

**A comprehensive esports platform showcasing professional gaming teams, tournaments, and news**

[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[Live Demo](#) | [Report Bug](#) | [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Pages Overview](#pages-overview)
- [Customization Guide](#customization-guide)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About The Project

**Esports Hub** is a modern, responsive web platform designed specifically for the **Tunisian Esports** and the broader esports community. The platform provides comprehensive coverage of professional gaming teams, tournaments, players, and the latest esports news across multiple competitive titles.

### Why This Project?

- **🏆 Centralized Hub**: All esports information in one elegant platform
- **🎨 Modern Design**: Premium gold/black/white theme inspired by major esports events
- **📱 Fully Responsive**: Seamless experience across all devices
- **⚡ Fast & Lightweight**: Pure HTML/CSS/JavaScript with no dependencies
- **🌍 Regional Focus**: Tailored for Tunisian and MENA esports scene

---

## ✨ Features

### 🏠 Home Page
- **Hero Section** with platform statistics
- **Featured Games Grid** showcasing 20+ esports titles
- **Latest News** with expandable sections
- **Upcoming Tournaments** display
- **Smooth Navigation** with anchor links

### 👥 Teams Page
- **Team Profiles** with logos and descriptions
- **Multi-Discipline Support** (League of Legends, CS2, Valorant, FIFA, etc.)
- **Player Rosters** organized by game
- **Team Statistics** (tournaments, wins, players)
- **Filter by Game** functionality
- **Interactive Modal** for detailed team view

### 🎮 Games Coverage
- Apex Legends Global Series
- Call of Duty (Black Ops 6, Warzone)
- Counter-Strike 2
- Dota 2
- League of Legends
- Valorant
- FIFA / FC Pro
- Rocket League
- And many more...

### 🎨 Design Features
- **Gold/Black/White Premium Theme**
- **Smooth Animations** and hover effects
- **Glassmorphism** effects on navigation
- **Gradient Accents** for visual hierarchy
- **Card-Based Layouts** for content organization

---

## 🛠️ Built With

This project is built with pure web technologies - no frameworks required!

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES6+)** - Dynamic content and interactions
- **Google Fonts** - Inter font family
- **Unsplash** - Placeholder images (replace with your own)

---

## 🚀 Getting Started

### Prerequisites

No special prerequisites needed! Just a modern web browser.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mehdi-Belajouza/esports-hub.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd esports-hub
   ```

3. **Open in your browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server (recommended)
   python -m http.server 8000
   # or
   npx serve
   ```

4. **View the site**
   - Open `http://localhost:8000` in your browser
   - Or directly open `index.html`

---

## 📄 Pages Overview

### 1. **index.html** - Home Page
Main landing page with featured games, news, and tournaments.

### 2. **teams.html** - Teams Directory
Complete list of Tunisian esports teams with detailed information.

### 3. **Additional Pages** (Coming Soon)
- Players directory
- Tournament brackets
- News archive
- Statistics dashboard

---

## 🎨 Customization Guide

### Changing Colors

Edit the CSS variables in the `:root` section:

```css
:root {
    --primary-gold: #D4AF37;        /* Main gold color */
    --accent-gold: #FFD700;         /* Bright gold accent */
    --dark-primary: #0D0D0D;        /* Main dark background */
    --dark-secondary: #1A1A1A;      /* Secondary dark */
    --white-primary: #FFFFFF;       /* Main white */
    /* Add more custom colors */
}
```

### Adding Teams

Edit the `teamsData` array in `teams.html`:

```javascript
const teamsData = [
    {
        id: 1,
        name: "Your Team Name",
        logo: "TN",  // Abbreviation
        founded: "Founded 2024",
        disciplines: ["League of Legends", "Valorant"],
        stats: {
            tournaments: "10",
            wins: "5",
            players: "8"
        },
        players: {
            "League of Legends": [
                { name: "PlayerName", role: "Role" }
            ]
        },
        description: "Team description here"
    }
];
```

### Modifying Games

Update the `gamesData` array with your game titles:

```javascript
const gamesData = [
    { name: "Game Title" },
    { name: "Another Game" }
];
```


## 🤝 Contributing

Contributions make the open-source community an amazing place to learn and create. Any contributions you make are **greatly appreciated**!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Ideas
- 🎨 Add new themes or color schemes
- 📱 Improve mobile responsiveness
- 🌐 Add internationalization (Arabic support)
- 📊 Create statistics dashboard
- 🎮 Add more game integrations
- ⚡ Performance optimizations

---

## 📝 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 📧 Contact

**Project Maintainer**: Your Name
- 📧 Email: your.email@example.com
- 🐦 Twitter: [@yourhandle](https://twitter.com/yourhandle)
- 💼 LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

**Tunisian Esports Federation**
- 🌐 Website: [www.tunisianesports.tn](#)
- 📱 Facebook: [@TunisianEsports](#)
- 📸 Instagram: [@tunisian_esports](#)

**Project Link**: [https://github.com/Mehdi-Belajouza/esports-hub](https://github.com/Mehdi-Belajouza/esports-hub)

---

## 🙏 Acknowledgments

- **Esports World Cup** - Design inspiration
- **Tunisian Esports Community** - Content and feedback
- **Unsplash** - Placeholder images
- **Google Fonts** - Inter font family
- **All Contributors** - Thank you for your support!

---

## 🗺️ Roadmap

- [x] Home page with games grid
- [x] Teams directory with filtering
- [x] Responsive design
- [ ] Player profiles page
- [ ] Tournament bracket system
- [ ] Live match tracking
- [ ] API integration for live data
- [ ] Admin dashboard
- [ ] Arabic language support
- [ ] Dark/Light theme toggle
- [ ] User authentication
- [ ] Social media integration

---

## 📊 Statistics

<div align="center">

![GitHub Stars](https://img.shields.io/github/stars/Mehdi-Belajouza/esports-hub?style=social)
![GitHub Forks](https://img.shields.io/github/forks/Mehdi-Belajouza/esports-hub?style=social)
![GitHub Issues](https://img.shields.io/github/issues/Mehdi-Belajouza/esports-hub)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Mehdi-Belajouza/esports-hub)

</div>

---

## 💡 Tips for Deployment

### GitHub Pages
```bash
# Push to gh-pages branch
git checkout -b gh-pages
git push origin gh-pages
```

### Netlify
Simply drag and drop your project folder or connect your GitHub repo.

### Vercel
```bash
vercel --prod
```

---

<div align="center">

**Made with ❤️ for the Tunisian Esports Community**

⭐ Star this repo if you find it helpful!

</div>