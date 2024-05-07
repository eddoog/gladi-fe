export function LandingPage() {
  return (
    <div> 
      <div className="mt-8 mb-4"> 
          <div className="flex justify-center">
              <div className="text-6xl font-bold">Gladi</div>
          </div>
      </div>

      <div className="mt-8 mb-4"> 
          <div className="flex justify-center">
              <div className="text-3xl font-bold">Practice your Public Speaking!</div>
          </div>
      </div>

      <div className="py-10">
        <div className="container mx-auto w-4/5">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                  <div className="flex flex-col items-center border border-gray-300 rounded-lg p-4">
                      <h3 className="mt-4 text-xl font-semibold text-gray-800">Video + Audio Recording</h3>
                      <p className="text-gray-600 mt-2">
                        Record your practice with in-build recording system.
                      </p>
                  </div>
                  <div className="flex flex-col items-center border border-gray-300 rounded-lg p-4">
                      <h3 className="mt-4 text-xl font-semibold text-gray-800">Speech-to-Text</h3>
                      <p className="text-gray-600 mt-2">
                        Turn your recording's audio into text.
                      </p>
                  </div>
                  <div className="flex flex-col items-center border border-gray-300 rounded-lg p-4">
                      <h3 className="mt-4 text-xl font-semibold text-gray-800">Improvement Advices</h3>
                      <p className="text-gray-600 mt-2">
                        See what you can improve from your practice with AI.
                      </p>
                  </div>
                  <div className="flex flex-col items-center border border-gray-300 rounded-lg p-4">
                      <h3 className="mt-4 text-xl font-semibold text-gray-800">See All Recording Practices</h3>
                      <p className="text-gray-600 mt-2">
                        See all of your practice's recording that you have already made.
                      </p>
                  </div>
              </div>
          </div>
      </div>
    </div>
    
  );
}
