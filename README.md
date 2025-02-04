# 🚀 **QuickDrop** - Effortless File Sharing Made Simple

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![Contributors](https://img.shields.io/badge/contributors-welcome-brightgreen.svg)](#contributing)

<p align="center">
  <img src="https://iili.io/2tN87Bn.png" alt="QuickDrop Logo" width="200" />
</p>

**QuickDrop** is a modern, lightweight application that allows you to share files or folders directly from your laptop's memory without storing them anywhere else. With its intuitive drag-and-drop interface, QR code generation, and secure sharing via ngrok tunnels, QuickDrop makes file sharing faster, simpler, and more efficient than ever before.

---

## 🌟 **Features**

- **Drag & Drop Upload**: Effortlessly upload files using a sleek drag-and-drop interface.
- **QR Code Sharing**: Generate a QR code for instant access to shared files.
- **Direct Memory Sharing**: Files are served directly from your laptop's memory—no cloud storage required.
- **Secure Connections**: Encrypted ngrok tunnels ensure secure and private file sharing.
- **Cross-Platform**: Works seamlessly on Windows, macOS, and Linux.
- **Responsive UI**: A modern, responsive design that looks great on both desktop and mobile.

---

## 🖥️ **Tech Stack**

- **Frontend**: React.js, Styled Components
- **Backend**: Node.js, Express.js
- **File Handling**: Multer
- **Tunneling**: Ngrok
- **Styling**: CSS-in-JS (Styled Components), Modern Gradient Design
- **Build Tools**: Webpack, Babel

---

## 📦 **Installation**

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Ngrok (for exposing the local server)

### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/QuickDrop.git
   cd QuickDrop
   ```

2. **Install Dependencies**
   ```bash
   # For Backend
   cd backend
   npm install

   # For Frontend
   cd ../frontend
   npm install
   ```

3. **Start the Backend Server**
   ```bash
   cd backend
   node server.js
   ```
   The backend will start on `http://localhost:5000`, and an ngrok tunnel will be created automatically.

4. **Start the Frontend Development Server**
   ```bash
   cd ../frontend
   npm start
   ```
   The frontend will start on `http://localhost:3000`.

5. **Access the App**
   Open your browser and navigate to `http://localhost:3000` to use QuickDrop.

---

## 📸 **Screenshots**

Here’s how QuickDrop looks in action:

<div align="center">
  <img src="https://i.imgur.com/your-screenshot1.png" alt="QuickDrop Homepage" width="400" />
  <img src="https://i.imgur.com/your-screenshot2.png" alt="QuickDrop QR Code" width="400" />
</div>

---

## 🛠️ **How It Works**

1. **Upload a File**:
   Drag and drop a file into the app or click to select a file from your device.

2. **Generate a Link**:
   Once uploaded, QuickDrop generates a public URL and a QR code for easy sharing.

3. **Share Instantly**:
   Share the link or QR code with others. The file is served directly from your laptop's memory via an encrypted ngrok tunnel.

4. **Terminate Session**:
   When you close the app, the session ends, ensuring no lingering access to your files.

---

## 📜 **License**

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Ngrok**: For providing secure tunneling to expose local servers.
- **React-Dropzone**: For enabling drag-and-drop functionality in the frontend.
- **QRCode.react**: For generating QR codes dynamically.

---

## 📞 **Contact**

If you have any questions or feedback, feel free to reach out:

- **GitHub**: [@V Sree Aditya](https://github.com/SreeAditya-Dev)
- **Youtube**: www.youtube.com/@CreativeScript7421
- **LinkedIn**: [V Sree Aditya](www.linkedin.com/in/v-sree-aditya)

---

## 🌐 **Live Demo**

Check out a live demo of QuickDrop: [QuickDrop Demo](https://your-demo-url.com)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/SreeAditya-Dev">Sree Aditya</a>
</p>

---

