
export function About() {

    var currentStep = 1

    function clicked(ev) {
        const id = ev.target.id
        if (id === '1' && currentStep === 1) {
            alert('read closely')
            alert('you have entered a classified area')
            alert('if you want to get out alive you must solve my riddle')
            alert('there are 10 steps until you are safe')
            alert('good luck')
            currentStep = 2
        }
        else if (id === '1' && currentStep === 2) {
            alert('whats the first letter of the alphabet?')
        }

        if (id === '2' && currentStep === 2) {
            document.getElementById('1').classList.toggle('hidden')
            alert('correct')
            alert('it seems you are smarter then the average person')
            alert('which doesnt mean much but still')
            alert('the next step wont be as easy')
            currentStep = 3
            document.getElementById('3').classList.toggle('hidden')
            document.getElementById('3.1').classList.toggle('hidden')
            alert('who is the number one youtuber?')
        }
        if (id === '3.1' && currentStep === 3) {
            const answer = (document.getElementById('3').value).toLowerCase()
            if (answer === 'pewdiepie') {
                document.getElementById('3').classList.toggle('hidden')
                document.getElementById('3.1').classList.toggle('hidden')
                alert('correct')
                alert('i guess i didnt take you seriously')
                alert('or you are using the internet for answers')
                alert('either way it wont help you')
                alert('onto the next step')
                currentStep = 4
                document.getElementById('4.1').classList.toggle('hidden')
                document.getElementById('4.2').classList.toggle('hidden')
                alert('which one is correct?')
            }
        }
        if ((id === '4.1' || id === '4.2') && currentStep === 4) {
            if (id === '4.1') {
                alert('correct')
                alert('its common knowledge afterall')
                alert('it seems you wont give up')
                alert('then so am i!')
                alert('next step!')
                currentStep = 5
                document.getElementById('4.1').classList.toggle('hidden')
                document.getElementById('4.2').classList.toggle('hidden')
                document.getElementById('5').classList.toggle('hidden')
            } else {
                alert('WRONG!')
            }
        }
        if (id === '5.1' && currentStep === 5) {
            document.getElementById('5').classList.toggle('hidden')
            alert('correct')
            alert('you have a keen eye')
            alert('or lack of tasks')
            alert('or a job, but i dont judge')
            alert('next step!')
            document.getElementById('6').classList.toggle('hidden')
            currentStep = 6
        }
        if (id === '6' && currentStep === 6) {
            console.log(document.getElementById('6').value)
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
    return <section className="about main-layout">
        <div className='about-text'>
            <h1>About Us</h1>
            <h4>We are a team of young developers who aspire to join high-tech industry to gain experience and change the world for the better.</h4>
            <h4>Currently we are students of Coding Academy, however soon we shall we shall enter the work force, filled with bright ideas!</h4>
            <h4>Day by day, we work on new projects and only gain further knowledge in FullStack Development </h4>
            <h4>We welcome you all, to take a look at our work on GitHub!</h4>
            <br />
            <h1>Meet The Team</h1>
            <div className='team-layout'>
                <div className='team-member'>
                    <h2>Roei Tal</h2>
                    <h4>Main role: handling the logic</h4>
                    <h4>Follow me on:</h4>
                    <div className='team-links'>
                        <h4><a href="https://github.com/RoeiTal123"><i className="fa-brands fa-square-github"></i></a></h4>
                        <h4><a href="https://github.com/RoeiTal123"><i className="fa-brands fa-linkedin"></i></a></h4>
                        <h4><a href="https://github.com/RoeiTal123"><i className="fa-brands fa-square-instagram"></i></a></h4>
                    </div>
                    <img src="imgs/roei.png" />
                </div>
                <div className='team-member'>
                    <h2>Valeriy Kuvshinov</h2>
                    <h4>Main role: handling the design</h4>
                    <h4>Follow me on:</h4>
                    <div className='team-links'>
                        <h4><a href="https://github.com/Valeriy-Kuvshinov"><i className="fa-brands fa-square-github"></i></a></h4>
                        <h4><a href="https://www.linkedin.com/in/valeriy-kuvshinov-85b14b282/"><i className="fa-brands fa-linkedin"></i></a></h4>
                        <h4><a href="https://www.instagram.com/valeriy.kuvshin.ov/"><i className="fa-brands fa-square-instagram"></i></a></h4>
                    </div>
                    <img src="imgs/valeriy.png" />
                </div>
            </div>
        </div>
        <section className='secret'>
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

            <input type="range" id="6" step={1} min={1} max={6} onChange={clicked} className='hidden' />
        </section>
    </section>
}
