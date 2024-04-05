import Image from "next/image";

export default function Home() {
    const handleClick = (buttonName) => {
    console.log(buttonName);
  };

  return (
      <main className="flex min-h-screen flex-col">
      <div className="bg-gray-200 min-h-screen flex justify-center items-center">
        <div className="grid grid-cols-4 gap-4">
          <button className="bg-yellow-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
            Button
          </button>
        </div>
      </div>
    </main>
  );
}



