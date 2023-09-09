
export function About() {

    var currentStep=1
    var timer=5
    var timerItself

    function clicked(ev){
        const id=ev.target.id
        if(id==='1'&&currentStep===1){
            alert('read closely')
            alert('you have entered a classified area')
            alert('if you want to get out alive you must solve my riddle')
            alert('there are 10 steps until you are safe')
            alert('good luck')
            currentStep=2
            document.getElementById('8.4').innerText=5
        }
        else if(id==='1'&&currentStep===2){
            alert('whats the first letter of the alphabet?')
        }

        else if(id==='2'&&currentStep===2){
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
        else if(id==='3.1'&&currentStep===3){
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
        else if((id==='4.1'||id==='4.2')&&currentStep===4){
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
            document.querySelector('.about').style.backgroundColor='red'
           } else {
            alert('WRONG!')
           }
        }
        else if(id==='5.1'&&currentStep===5){
            document.getElementById('5').classList.toggle('hidden')
            alert('correct')
            alert('you have a keen eye')
            alert('or lack of tasks')
            alert('or a job, but i dont judge')
            alert('next step!')
            document.getElementById('6').classList.toggle('hidden')
            document.getElementById('6.1').classList.toggle('hidden')
            document.getElementById('6.2').classList.toggle('hidden')
            currentStep=6
            alert('how much times stronger earth gravity compare to the moon?')
        }
        else if(id==='6'&&currentStep===6){
            document.getElementById('6.1').innerText=document.getElementById('6').value
        }
        else if(id==='6.2'&&currentStep===6){
            if(document.getElementById('6').value==='6'){
                alert('correct')
                alert('you are as stubborn as a mule')
                alert('guess you want to challenge yourself')
                alert('GOOD')
                alert('NEXT STEP')
                currentStep=7
                document.getElementById('6').classList.toggle('hidden')
                document.getElementById('6.1').classList.toggle('hidden')
                document.getElementById('6.2').classList.toggle('hidden')

                document.getElementById('7').classList.toggle('hidden')
                document.getElementById('7.1').classList.toggle('hidden')
                alert('dont mind the background, its normal')
            }
        }
        else if(id==='7.1'&&currentStep===7){
            if(document.getElementById('7').value.toLowerCase()==='sus'){
                document.getElementById('7').classList.toggle('hidden')
                document.getElementById('7.1').classList.toggle('hidden')
                alert('curse you!')
                alert('even that wont stop you')
                alert('guess i have to bring the big guns')
                document.getElementById('8').classList.toggle('hidden')
                document.getElementById('8.1').classList.toggle('hidden')
                document.getElementById('8.2').classList.toggle('hidden')
                document.getElementById('8.3').classList.toggle('hidden')
                document.getElementById('8.4').classList.toggle('hidden')
                currentStep=8
                timerItself=setInterval(tiktok,1000)
            }
        }
        else if(id==='8.3'&&currentStep===8){
            if(document.getElementById('8.1').value==='-2'){
                clearInterval(timerItself)
                alert('correct, sadly')
                alert('no more explanations')
                document.getElementById('8').classList.toggle('hidden')
                document.getElementById('8.1').classList.toggle('hidden')
                document.getElementById('8.2').classList.toggle('hidden')
                document.getElementById('8.3').classList.toggle('hidden')
                document.getElementById('8.4').classList.toggle('hidden')
                currentStep=9
                document.getElementById('9').classList.toggle('hidden')
                document.getElementById('9.1').classList.toggle('hidden')
                document.getElementById('9.2').classList.toggle('hidden')
            }
        }
        else if(id==='9.2'&&currentStep===9){
            if(document.getElementById('9').value.toLowerCase()==='this is impossible to translate'){
                alert('argh!!!')
                document.getElementById('9').classList.toggle('hidden')
                document.getElementById('9.1').classList.toggle('hidden')
                document.getElementById('9.2').classList.toggle('hidden')
                currentStep=10
                document.getElementById('10').classList.toggle('hidden')
                document.getElementById('10.1').classList.toggle('hidden')
                document.getElementById('10.2').classList.toggle('hidden')
                document.getElementById('10.3').classList.toggle('hidden')
                document.getElementById('10.4').classList.toggle('hidden')

                document.getElementById('10').style.color='white'
                document.getElementById('10.1').style.color='white'
                document.getElementById('10.2').style.color='white'
                document.getElementById('10.3').style.color='white'
                document.getElementById('10.4').style.color='white'
                document.querySelector('.about').style.backgroundColor='black'
            }
        }
        else if(currentStep===10){
            if(id!=='10.1'){
                window.location.href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            } else {
                alert('argh!!!!!!!!!!!!!!!!!!')
                document.getElementById('10').classList.toggle('hidden')
                document.getElementById('10.1').classList.toggle('hidden')
                document.getElementById('10.2').classList.toggle('hidden')
                document.getElementById('10.3').classList.toggle('hidden')
                document.getElementById('10.4').classList.toggle('hidden')
                document.querySelector('.about').style.backgroundColor='white'
            }
        }

    }

    function tiktok(){
        if(timer===0){
            alert('YOU ARE DEAD')

            document.getElementById('8.1').classList.toggle('hidden')
            document.getElementById('8.2').classList.toggle('hidden')
            document.getElementById('8.3').classList.toggle('hidden')
            document.getElementById('8.4').classList.toggle('hidden')

            document.getElementById('8').height='600'
            document.getElementById('8').src='imgs/boomboom.gif'
        }
        timer--
        document.getElementById('8.4').innerText=timer
    }
    
    return <section className="about">
              <h1>About P<span onClick={clicked} id='2' className='button2'>a</span>ge</h1>
              <button onClick={clicked} id='1' className='button1'>Click Me</button>
              <input type='text' id='3' className='hidden'></input>
              <button onClick={clicked} id='3.1' className='hidden'>Submit Answer</button>
              <button onClick={clicked} id='4.1' className='hidden'>gif</button>
              <button onClick={clicked} id='4.2' className='hidden'>jif</button>
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

              <input type="range" id='6' step={1} min={1} max={6} onChange={clicked} className='hidden'/>
              <span id='6.1' className='hidden'>1</span>
              <button onClick={clicked} id='6.2' className='button3 hidden'>Submit answer</button>

              <input type='text' id='7' className='hidden'></input>
              <button onClick={clicked} id='7.1' className='button4 hidden'>Submit answer</button>

              <img src='imgs/boom.jpg' id='8' className='hidden'/>
              <input type='text' id="8.1" className='hidden'></input>
              <div id='8.2' className='hidden'>X²+4x+4=0, x=?</div>
              <button onClick={clicked} id='8.3' className='button5 hidden'>Submit answer</button>
              <span id='8.4' className='hidden'>5</span>

              <input type='text' id='9' className='hidden'></input>
              <span id='9.1' className='hidden'>❄☟✋💧   ✋💧   ✋💣🏱⚐💧💧✋👌☹☜   ❄⚐   ❄☼✌☠💧☹✌❄☜</span>
              <button onClick={clicked} id='9.2' className='button6 hidden'>Submit answer</button>

              <div id='10' className='hidden'>which of <span onClick={clicked} id='10.1' className='hidden'>this</span> is correct?</div>
              <button onClick={clicked} id='10.2' className='button7 hidden'>this</button>
              <button onClick={clicked} id='10.3' className='button8 hidden'>that</button>
              <button onClick={clicked} id='10.4' className='button9 hidden'>not that</button>
           </section>
}
