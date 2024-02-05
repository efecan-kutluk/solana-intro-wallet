const Ripoff = () => (
        <div className={"bg-base-02 rounded-2xl backdrop-blur-[20px] p-4 shadow-swap2-dark"}>
         <form>
            <div className={"flex-col space-y-2 relative"}>
              <div className={"flex justify-between"}>
                <label className={"text-xs sm:text-sm font-medium text-base-3 whitespace-nowrap"}>Transfer</label>
                <div className={"flex space-x-2"}></div>
              </div> 
              <div className={"p-4 h-[72px] border border-transparent relative bg-base-04 rounded-xl flex flex-col space-y-3 group focus-within:border-v2-primary/50 focus-within:shadow-swap-input-dark"}>
                <div className={"flex"}>
                  <div className={"flex justify-between items-center"}>
                    <label>SOL</label>
                  </div>
                  <span className={"flex-1 text-right"}>
                    <div className={"flex flex-col text-right h-full"}>
                      <input inputmode="decimal" type="text" className={"h-full w-full bg-transparent disabled:cursor-not-allowed disabled:opacity-100 text-base-3 text-right font-semibold placeholder:text-white/25 text-xl outline-none"}/>
                    </div>
                  </span>

                </div>
              </div>
            </div>
          </form> 
        </div>
)
