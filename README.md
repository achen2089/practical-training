# Practical Training

This project is a Next.js application that uses AI to create personalized strength training programs based on a form filled by the user.

## Demo

Check out the [demo video](https://youtu.be/eB_eud9jf8g) to see Practical Training in action or try the live demo [here](https://practical-training.vercel.app/).

## Features

- User-friendly form for inputting personal fitness data
- AI-powered generation of customized workout plans
- Intelligent program that adjusts based on user's progress, changes, and feedback

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/`: Main application directory
  - `demo/page.tsx`: Main page component for the program creation form
- `components/`: Reusable React components
  - `ProfileForm.tsx`: Component for user input form
  - `TrainingProgram.tsx`: Component to display the generated training program
- `lib/`: Utility functions and server actions
  - `createProgram.ts`: Server action to generate a training program
  - `streaming/streamProgram.ts`: Function to stream program generation

## Technologies Used

- Next.js
- React
- Tailwind CSS
- TypeScript
- OpenAI API
- Vercel AI SDK
- Zod (for form validation)
- React Hook Form


## State of the Project

This project is currently on hold due to:

1. Lack of mobile interface, which is essential for a fitness application.
2. Need for more comprehensive features to make it a fully-fledged app.

I may revisit and expand this project in the future to address these limitations and enhance the overall user experience.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
