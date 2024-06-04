export function LandingPage() {
  return (
    <div>
      <div className="mb-4 mt-8">
        <div className="flex justify-center">
          <div className="text-6xl font-bold">Gladi</div>
        </div>
      </div>

      <div className="mb-4 mt-8">
        <div className="flex justify-center">
          <div className="text-3xl font-bold">
            Practice your Public Speaking!
          </div>
        </div>
      </div>

      <div className="py-10">
        <div className="container mx-auto w-4/5">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800 dark:text-gray-200 md:text-4xl">
            Features
          </h2>
          <div className="flex flex-row flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-300 p-4 transition-all duration-200 ease-in-out hover:scale-110">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-800 text-start text-white drop-shadow-xl dark:bg-gray-200 dark:text-gray-800 md:h-6 md:w-6">
                1
              </div>
              <h3 className="mt-4 text-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                Video + Audio Recording
              </h3>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                Record your practice with in-build recording system.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-gray-300 p-4 transition-all duration-200 ease-in-out hover:scale-110">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-800 text-start text-white drop-shadow-xl dark:bg-gray-200 dark:text-gray-800 md:h-6 md:w-6">
                2
              </div>
              <h3 className="mt-4 text-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                Speech-to-Text
              </h3>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                Turn your recording's audio into text.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-gray-300 p-4 transition-all duration-200 ease-in-out hover:scale-110">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-800 text-start text-white drop-shadow-xl dark:bg-gray-200 dark:text-gray-800 md:h-6 md:w-6">
                3
              </div>
              <h3 className="mt-4 text-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                Improvement Advices
              </h3>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                See what you can improve from your practice with AI.
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg border border-gray-300 p-4 transition-all duration-200 ease-in-out hover:scale-110">
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-800 text-start text-white drop-shadow-xl dark:bg-gray-200 dark:text-gray-800 md:h-6 md:w-6">
                4
              </div>
              <h3 className="mt-4 text-center text-xl font-semibold text-gray-800 dark:text-gray-200">
                See All Recording Practices
              </h3>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                See all of your practice's recording that you have already made.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
