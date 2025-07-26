# Maharashtra E-Seva Kendra

A comprehensive digital services platform providing online citizen services with a focus on rent agreement calculations and government service integrations.

## 🚀 Live Demo

Visit the live application: [Maharashtra E-Seva Kendra](https://yourusername.github.io/maharashtra-eseva-kendra/)

## 📋 Features

- **Rent Agreement Calculator**: Calculate total costs for rent agreements including government charges and service fees
- **Digital Services**: Complete range of citizen services including:
  - Identity Documents (Aadhaar, PAN, Voter ID, Driving License, Passport)
  - Government Certificates (Income, Caste, Domicile, Non-Creamy Layer)
  - Business Services (Shop Act License, Udyam Registration, GST, Trade License, Food License)
  - Employment & Financial Services (PF, ESI)
  - Property & Land Services (Rent Agreement, Land Records, Property Registration)
  - Other Essential Services (Ration Card, Birth Certificate)

- **Interactive Service Dialogs**: Detailed document requirements and contact forms for each service
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Government Branding**: Authentic Maharashtra E-Seva styling with proper Hindi/Marathi fonts

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom theming
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 🚀 Deployment to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Fork or clone this repository**
2. **Push to your GitHub repository**
3. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Set Source to "GitHub Actions"
   - The workflow will automatically deploy on every push to main branch

### Option 2: Manual Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Run the deployment script**:
   ```bash
   ./deploy.sh
   ```
   
   Or use gh-pages directly:
   ```bash
   npx gh-pages -d dist/public
   ```

### Option 3: GitHub Pages Configuration

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Copy build files to root** (for GitHub Pages):
   ```bash
   cp -r dist/public/* .
   ```

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

4. **Enable GitHub Pages** in repository settings

## 🔧 Development

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/maharashtra-eseva-kendra.git
   cd maharashtra-eseva-kendra
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: http://localhost:5000

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/public` directory.

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   └── assets/         # Static assets
├── attached_assets/        # Government service images and logos
├── .github/workflows/      # GitHub Actions for deployment
├── deploy.sh              # Manual deployment script
└── README.md              # This file
```

## 🎨 Customization

### Updating Repository Name

If you change the repository name, update the following:

1. **GitHub workflow** (`.github/workflows/deploy.yml`)
2. **Deployment script** (`deploy.sh`)
3. **README links**

### Adding New Services

1. Add service data to `serviceDocuments` object in `Index.tsx`
2. Add service dialog in the appropriate category section
3. Update service icons and descriptions as needed

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support, please open an issue in the GitHub repository.

---

**Note**: This application is designed for educational and demonstration purposes. For production use with real government services, proper authentication and backend integration would be required.