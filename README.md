# Festive India ✨

**Festive India** is a responsive, production-quality frontend for a marketplace of atomic festival experiences in India. It's designed to help tourists and domestic travelers discover, book, and navigate curated micro-experiences within India's most vibrant festivals, complete with an immersive AR and narrative layer.

**[Live Demo Link Here]** *(<- Replace with your deployment URL)*


*(A placeholder image. Replace with a screenshot or GIF of the actual application.)*

---

## 🚀 Core Features

-   **🔍 Personalized Discovery**: A Netflix-style recommender system asks for user preferences to suggest relevant festivals and experiences.
-   **🗺️ Interactive Live Maps**: Powered by Mapbox GL JS, users can explore festival grounds with filterable layers for amenities (toilets, water), points of interest, and mock crowd-density heatmaps.
-   **🎟️ Seamless Booking Flow**: A clean, mobile-first interface to browse experiences, select slots, and complete a mock checkout process.
-   **📱 Digital Passes**: Post-booking, users receive a digital ticket with a QR code in their "My Bookings" section for easy access.
-   **📖 Immersive Story Trails**: Follow narrative-driven audio guides for key festival legends, with placeholders for future AR experiences.
-   **🛠️ Host & Admin Dashboards**: Fully functional demo dashboards to simulate creating new experiences (hosts) and pushing global alerts (admins).
-   **🌐 i18n Ready**: Placeholder for multi-language support (EN, HI, FR, ES) to cater to a global audience.
-   **♿ Accessibility First**: Designed with WCAG AA standards in mind, ensuring keyboard navigation, proper focus states, and ARIA labels.
-   **📱 Fully Responsive**: A mobile-first design that scales beautifully to tablets and desktops.

---

## 🛠️ Tech Stack

This project is built with a modern, robust frontend stack, focusing on performance, developer experience, and scalability.

-   **Framework**: [React 19](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Routing**: [React Router v6](https://reactrouter.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Mapping**: [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js)
-   **State Management**: React Context + `useReducer` (A simple, powerful alternative to external libraries for this scale).
-   **UI Components**: Custom, reusable components inspired by [shadcn/ui](https://ui.shadcn.com/).
-   **Icons**: [Lucide React](https://lucide.dev/)

*This project is a **frontend-only application**. All data is mocked from local JSON fixtures in `/src/services/api.ts` to simulate a real backend.*

---

## 📂 Project Structure

The codebase is organized logically to ensure maintainability and scalability.

```
/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components (Button, Card, Map, etc.)
│   │   ├── ui.tsx          # Primitive UI elements
│   │   └── Map.tsx         # Mapbox wrapper component
│   ├── pages/
│   │   └── Pages.tsx       # All page components (Landing, FestivalDetail, etc.)
│   ├── services/
│   │   └── api.ts          # Mock API functions and seed data
│   ├── store/
│   │   └── store.ts        # Global state management (Context + Reducer)
│   ├── App.tsx             # Main app component with routing
│   ├── index.tsx           # React entry point
│   └── types.ts            # All TypeScript type definitions
├── index.html              # Main HTML file
└── README.md               # You are here!
```

---

## 🏁 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later)
-   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/festive-india.git
cd festive-india
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of your project and add your Mapbox public token. You can get one for free from the [Mapbox website](https://www.mapbox.com/).

```
# .env.local
VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91ci11c2VybmFtZSI...
```
*(Note: If you are not using Vite, you might need to name the variable `REACT_APP_MAPBOX_TOKEN` for Create React App).*

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

The application should now be running at `http://localhost:5173` (or another port).

---

## 🚀 Demo Walkthrough

To experience the full functionality of the demo, follow these steps:

1.  **Personalize Your Trip**: On the landing page, click "Personalize My Trip", select your interests (e.g., `Cultural`, `Foodie`), and see recommended festivals.
2.  **Explore a Festival**: Navigate to the "Durga Puja 2025" festival.
3.  **Book an Experience**:
    -   Choose the "Kumartuli Idol-Making Workshop".
    -   Select a time slot and quantity.
    -   Click "Add to Cart". You will be redirected to the checkout page.
4.  **Checkout**: Fill in the mock payment details and click "Pay" to complete the booking.
5.  **View Your Ticket**: Go to the "My Bookings" page from the header to see your order summary and a scannable QR code.
6.  **Interact with the Map**:
    -   From the Durga Puja page, click "Live Map".
    -   Pan, zoom, and click on icons to see details about toilets, water stations, etc.
7.  **Follow a Story**:
    -   From the Durga Puja page, click "Story Trails".
    -   Explore the steps of the "Legend of Mahishasura" narrative.
8.  **Simulate Admin/Host Actions**:
    -   **Host**: Go to the "For Hosts" dashboard to create and publish a new experience. It will immediately appear on the festival page.
    -   **Admin**: Go to the "Admin" console, type a message (e.g., "Zone C is crowded!"), and click "Push Alert". A global banner will appear at the top of the site.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions or want to improve the code, please feel free to fork the repository, create a new branch, and open a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
