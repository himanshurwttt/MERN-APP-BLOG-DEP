export default function About() {
  return (
    <div className="flex flex-col min-h-[100dvh] max-w-screen-2xl m-auto">
      <main className="flex-1 m-auto">
        <section className="w-full py-12 md:py-24 lg:py-8">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-[500] tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Exploring the World of Web Development
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Welcome to our blog, where we dive deep into the latest
                    technologies and trends shaping the web development
                    landscape. Our mission is to empower developers of all skill
                    levels with practical insights and cutting-edge knowledge.
                  </p>
                </div>
              </div>
              <img
                src={"../../public/images/01.jpg"}
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video drop-shadow-md overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-8 bg-[#f8f8ff] rounded-3xl">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4  text-center">
              <div className="space-y-8">
                <h2 className="text-3xl  font-[500] tracking-tighter sm:text-5xl">
                  Dive into the Latest Web Technologies
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our blog covers a wide range of web development topics,
                  including JavaScript, React, Node.js, and more. Stay up to
                  date with the latest trends and best practices to enhance your
                  skills and build better web applications.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl  font-[500]">JavaScript</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Dive deep into the world of JavaScript, from language
                    fundamentals to advanced concepts and frameworks.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">React</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Explore the power of React, the popular JavaScript library
                    for building user interfaces.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Node.js</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Learn how to use Node.js, the JavaScript runtime
                    environment, to build server-side applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Meet Our Talented Contributors
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our blog is powered by a team of passionate web developers who
                  share their expertise and insights to help you grow. Get to
                  know the people behind the content.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <img
                  src="https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833560.jpg?size=626&ext=jpg&ga=GA1.1.1757842217.1718464723&semt=ais_user"
                  width="120"
                  height="120"
                  alt="John Doe"
                  className="mx-auto rounded-full  drop-shadow-xl"
                />
                <div className="grid gap-1 text-center">
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Full-stack Developer
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    John is a seasoned web developer with a passion for building
                    scalable and performant applications. He shares his
                    expertise in JavaScript, React, and Node.js.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <img
                  src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.1757842217.1718464723&semt=ais_user"
                  width="120"
                  height="120"
                  alt="Jane Smith"
                  className="mx-auto rounded-full drop-shadow-xl"
                />
                <div className="grid gap-1 text-center">
                  <h3 className="text-xl font-bold">Jane Smith</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Front-end Engineer
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Jane is a front-end specialist with a keen eye for design.
                    She shares her expertise in modern web technologies,
                    including React, CSS, and UI/UX.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <img
                  src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?size=626&ext=jpg&ga=GA1.1.1757842217.1718464723&semt=ais_user"
                  width="120"
                  height="120"
                  alt="Bob Johnson"
                  className="mx-auto rounded-full drop-shadow-xl"
                />
                <div className="grid gap-1 text-center">
                  <h3 className="text-xl font-bold">Bob Johnson</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Back-end Developer
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Bob is a back-end expert with a deep understanding of
                    server-side technologies. He shares his knowledge on
                    Node.js, databases, and API design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
