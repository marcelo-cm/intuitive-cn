import ExperienceList from './_components/experience-list';

export default function Home() {
  return (
    <main className="flex flex-grow flex-col items-center overflow-x-hidden sm:items-start">
      <section className="mx-auto flex w-full max-w-2xl grow flex-col gap-12 px-4 py-8 md:py-12">
        <div>
          <p>Marcelo Chaman Mallqui</p>
          <p className="text-muted-foreground">Software & Design</p>
        </div>
        <div className="relative -z-10 h-10">
          <div className="absolute left-1/2 h-24 w-dvw -translate-x-1/2 overflow-hidden mask-b-from-20%">
            <div className="border-muted-foreground/25 absolute top-1.5 left-1/2 h-dvw w-[200dvw] -translate-x-1/2 rounded-[100%] border border-b-0" />
            <div className="text-accent-foreground absolute left-1/2 flex -translate-x-1/2 flex-col items-center font-mono font-medium">
              <div className="bg-accent-foreground relative h-3 w-px" />
              <p>TODAY</p>
            </div>
          </div>
        </div>
        <ExperienceList />

        <div className="text-muted-foreground flex flex-row gap-3">
          <a
            href="mailto:marcelo@gumloop.com"
            className="active:text-accent-foreground hover:underline"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/marc-cham/"
            className="active:text-accent-foreground hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/marcelo-cm"
            className="active:text-accent-foreground hover:underline"
          >
            GitHub
          </a>
        </div>
      </section>
      {/* <Crosshair /> */}
    </main>
  );
}
