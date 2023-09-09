
export function About() {

    var currentStep=1

    function clicked(ev){
        const id=ev.target.id
        if(id==='1'&&currentStep===1){
            alert('read closely')
            alert('you have entered a classified area')
            alert('if you want to get out alive you must solve my riddle')
            alert('there are 15 steps until you are safe')
            alert('good luck')
            currentStep=2
        }
        else if(id==='1'&&currentStep===2){
            alert('whats the first letter of the alphabet?')
        }

        if(id==='2'&&currentStep===2){
            document.getElementById('1').classList.toggle('hidden')
            alert('correct')
            alert('it seems you are smarter then the average person')
            alert('which doesnt mean much but still')
            alert('the next step wont be as easy')
            currentStep=3
            document.getElementById('3').classList.toggle('hidden')
            document.getElementById('3.1').classList.toggle('hidden')
            alert('who is the number one youtuber?')
        }
        if(id==='3.1'&&currentStep===3){
            const answer=(document.getElementById('3').value).toLowerCase()
            if(answer==='pewdiepie'){
                document.getElementById('3').classList.toggle('hidden')
                document.getElementById('3.1').classList.toggle('hidden')
                alert('correct')
                alert('i guess i didnt take you seriously')
                alert('or you are using the internet for answers')
                alert('either way it wont help you')
                alert('onto the next step')
                currentStep=4
                document.getElementById('4.1').classList.toggle('hidden')
                document.getElementById('4.2').classList.toggle('hidden')
                alert('which one is correct?')
            }
        }
        if((id==='4.1'||id==='4.2')&&currentStep===4){
           if(id==='4.1'){
            alert('correct')
            alert('its common knowledge afterall')
            alert('it seems you wont give up')
            alert('then so am i!')
            alert('next step!')
            currentStep=5
            document.getElementById('4.1').classList.toggle('hidden')
            document.getElementById('4.2').classList.toggle('hidden')
            document.getElementById('5').classList.toggle('hidden')
           } else {
            alert('WRONG!')
           }
        }
        if(id==='5.1'&&currentStep===5){
            document.getElementById('5').classList.toggle('hidden')
            alert('correct')
            alert('you have a keen eye')
            alert('or lack of tasks')
            alert('or a job, but i dont judge')
            alert('next step!')
            document.getElementById('6').classList.toggle('hidden')
            currentStep=6
        }
        if(id==='6'&&currentStep===6){
            console.log( document.getElementById('6').value)
        }
    }
    return <section className="about">
              <h1>About P<span onClick={clicked} id='2' className="button2">a</span>ge</h1>
              <button onClick={clicked} id='1' className="button1">Click Me</button>
              <input type="text" id="3" className='hidden'></input>
              <button onClick={clicked} id="3.1" className='hidden'>Submit Answer</button>
              <button onClick={clicked} id="4.1" className='hidden'>gif</button>
              <button onClick={clicked} id="4.2" className='hidden'>jif</button>
              <h1 id='5' className='hidden'>888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              88888888888888888888888888888888888888<span onClick={clicked} id='5.1' className='fifth'>3</span>888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
              888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888</h1>

              <input type="range" id="6" step={1} min={1} max={6} onChange={clicked} className='hidden'/>
           </section>
}
