//Homepage of the website
import React from 'react'

function Home() {
    import ('../styles/home.css')
    return (
    <main id="R_home">
        <title>The Board</title>
        <div id="banner">
            <div id="bannerText">
                <h1>the-board</h1>
                <h2>Your Infinite Canvas</h2>
                <h2>Defined for Creativity</h2>
            </div>
            <img id="bannerImg" src='this_came_out_better_than_expected.png'></img>
        </div>
        <div className='ptBlock'>
            <div>
                <div className='pretendImg'>Placeholder Image</div>
            </div>
            <div className='ptText'>
                <h3>Convenience with Control</h3>
                <p>This app prides in always being as fast as your own workflow</p>
                <p>And it'll only get easier</p>
            </div>
        </div>
        <div className='ptBlock'>
            <div className='ptText'>
                <h3>Open Source</h3>
                <p>Have an idea? Found a bug? Or just want to contribute?</p>
                <p>You can view the <a href='https://github.com/TheLegendary1248/the-board-sane'>source code right here!</a></p>
            </div>
            <div>
                <div className='pretendImg'>Placeholder Image</div>
            </div>
        </div>
        <div className='ptBlock'>
            <div>
                <div className='pretendImg'>Placeholder Image</div>
            </div>
            <div className='ptText'>
                <h3><span id='thirdAlterText'>mostly</span>Free to Use</h3>
                <p>You can use the app for free with a generous limit</p>
            </div>
        </div>
        <footer>
            <p><a>Pointless Link 1</a></p>
            <p><a>Pointless Link 2</a></p>
            <p><a>Pointless Link 3</a></p>
            <p><a>Pointless Link 4</a></p>
            <p><a>Pointless Link 5</a></p>
            <p><a>Pointless Link 6</a></p>
            <p><a>Pointless Link 7</a></p>
            <p><a>Pointless Link 8</a></p>
            <p><a>Pointless Link 9</a></p>
            <p><a>Pointless Link 10</a></p>
            <p><a>Pointless Link 11</a></p>
            <p><a>Pointless Link 12</a></p>
        </footer>
    </main>
    )
}

export default Home

