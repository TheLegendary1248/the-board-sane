//Homepage of the website
const React = require('react')
const Head = require("./defHead.jsx")
const Body = require("./defBody.jsx")

function Home() {
    return (
        <html>
            <Head>
                <link rel="stylesheet" href="styles/home.css"/>
            </Head>
            <Body title="The Board">
                <div id="banner">
                    <div id="bannerText">
                        <h1>the-board</h1>
                        <h2>An Infinite Canvas</h2>
                        <h2>For Infinite Creativity</h2>
                    </div>
                    <img id="bannerImg"></img>
                </div>
                <div>
                    Point 1
                </div>
                <div>
                    Point 2
                </div>
                <div>
                    Point 3
                </div>
            </Body>
        </html>
    )
}

module.exports = Home

