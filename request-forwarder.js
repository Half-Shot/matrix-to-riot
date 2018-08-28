/**
 * Matrix.to Riot
 * Written by Half-Shot <me@half-shot.uk>
 * 
 * Copyright 2018 Will Hunt
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

browser.runtime.onMessage.addListener(async (msg) => {
    console.log("msg:", msg);
    let hashUrl = null;
    // Find Riot
    const result = await browser.tabs.query({
        url: [
            "https://riot.im/develop/*",
            "https://riot.im/app/*"
        ]
    });
    if (result.length === 0) {
        throw new Error("Tab not found");
    }
    if (msg.startsWith("@")) {
        hashUrl = "#/user/" + msg;
    } else if (msg.startsWith("#")) {
        hashUrl = "#/room/" + msg;
    } else if (msg.startsWith("#")) {
        hashUrl = "#/group/" + msg;
    } else {
        throw new Error("MatrixID not understood");
    }
    await browser.tabs.executeScript(result[0].id, {
        code: `window.location.hash = "${hashUrl}";`
    });
    browser.tabs.update(
        result[0].id,
        {
            active: true,
        }
    );
    return;
});