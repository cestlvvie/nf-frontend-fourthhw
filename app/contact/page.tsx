import Link from "next/link";
 
export default function Contact(){
    return(
      <main className="flex-grow flex justify-center items-center">
        <div className="bg-[#F5E0D8] rounded-lg p-4 md:p-8 max-w-md mx-auto">
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">contact me</h1>
              <p className="text-[#666]">get in touch with me for any inquiries or feedback.</p>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name">name</label>
                <input className="ml-4 rounded-lg p-1" id="name" placeholder="enter your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email">email</label>
                <input className="ml-4 rounded-lg p-1" id="email" type="email" placeholder="m@example.com" />
              </div>
              <button type="submit" className="w-full bg-white rounded-lg p-2">
                send message
              </button>
            </form>
          </div>
        </div>
      </main>
    
    );
}