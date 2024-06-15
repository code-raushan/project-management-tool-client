import GoToDashboard from "@/components/core/GoToDashboardBtn";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] min-w-[100vw]">
      <section className="flex flex-col items-center px-36 text-center">
        <p className="font-bold text-white text-xl pb-5">
          Streamline your workflow, collaborate seamlessly, and achieve your
          goals with our intuitive project management tool. Organize tasks,
          track progress, and bring your projects to successful completion—all
          in one place. Get started by selecting a project or creating a new one
          to embark on your productivity journey.
        </p>
        <div>
          <GoToDashboard />
        </div>
      </section>
    </main>
  );
}

//Streamline your workflow, collaborate seamlessly, and achieve your goals with our intuitive project management tool. Organize tasks, track progress, and bring your projects to successful completion—all in one place. Get started by selecting a project or creating a new one to embark on your productivity journey.
