
export function About() {

    var currentStep=1

    function clicked(ev){
        const id=ev.target.id
        console.log(id)
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
            alert('correct')
            alert('it seems you are smarter then the average person')
            alert('which doesnt mean much but still')
            alert('the next step wont be as easy')
            alert('this isnt for the lighthearted')
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
            }
        }
        if(id==='1'&&currentStep===4){

        }
    }
    return <section className="about">
              <h1>About P<span onClick={clicked} id='2' className="button2">a</span>ge</h1>
              <button onClick={clicked} id='1' className="button1">Click Me</button>
              <input type="text" id="3" className='hidden'></input>
              <button onClick={clicked} id="3.1" className='hidden'>Submit Answer</button>
           </section>
}
