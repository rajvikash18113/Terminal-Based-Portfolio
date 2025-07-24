document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('command-input');
    const output = document.getElementById('output');
    const prompt = document.querySelector('.prompt');

    // ---: Typing Animation Starts Here ---
    const welcomeMessages = [
        { text: "Welcome to my interactive portfolio!", speed: 50 },
        { text: "Type 'help' to see the list of available commands.", speed: 30 }
    ];

    async function displayWelcome() {
        commandInput.disabled = true;
        for (const message of welcomeMessages) {
            const line = document.createElement('div');
            output.appendChild(line);
            await new Promise(resolve => {
                let i = 0;
                function type() {
                    if (i < message.text.length) {
                        line.innerHTML += message.text.charAt(i);
                        i++;
                        setTimeout(type, message.speed);
                    } else {
                        resolve();
                    }
                }
                type();
            });
        }
        output.appendChild(document.createElement('br'));
        commandInput.disabled = false;
        commandInput.focus();
    }

    displayWelcome();
    // ---: Typing Animation Ends Here ---

    document.getElementById('terminal').addEventListener('click', () => {
        commandInput.focus();
    });

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim().toLowerCase();
            const commandEcho = document.createElement('div');
            commandEcho.innerHTML = `<span class="prompt">${prompt.textContent}</span> <span class="command-echo">${command}</span>`;
            output.appendChild(commandEcho);
            processCommand(command);
            commandInput.value = '';
            output.scrollTop = output.scrollHeight;
        }
    });

    function processCommand(command) {
        const result = document.createElement('div');
        switch (command) {
            case 'help':
                result.innerHTML = `
                    Available commands: <br>
                    - <strong>about</strong>: Who am I? <br>
                    - <strong>skills</strong>: What I can do. <br>
                    - <strong>projects</strong>: See my work. <br>
                    - <strong>coding</strong>: Analyze my Coding Profiles. <br>
                    - <strong>resume</strong>: Get my Resume. <br>
                    - <strong>certificate</strong>: See my certifications. <br>
                    - <strong>clear</strong>: Clear the terminal.
                `;
                break;
            case 'about':
                result.innerHTML = `
                    Hello! I'm Vikash Kumar, a passionate Computer Science and Engineering student. 
                    I love building cool things with code and solving complex problems.
                `;
                break;
            case 'skills':
                result.innerHTML = `
                    <strong>Languages:</strong> C++, Java, JavaScript, HTML/CSS <br>
                    <strong>Frameworks:</strong> React, Node.js <br>
                    <strong>Tools:</strong> Git, Github, VS Code <br>
                    <strong>Databases:</strong> MySQL, MongoDB
                `;
                break;
            case 'projects':
                result.innerHTML = `
                    Here are some of my projects: <br>
                    1. <a href="#" target="_blank">Project One</a> - A brief description of your amazing project. <br>
                    2. <a href="#" target="_blank">Another Cool Project</a> - Describe what makes this project stand out.
                `;
                break;
            case 'coding':
                result.innerHTML = `
                    Here are my Coding Profiles: <br>
                    1. <a href="#" target="_blank">Leetcode</a><br>
                    2. <a href="#" target="_blank">CodeChef</a><br>
                `;
                break;
            case 'resume':
                result.innerHTML = `
                    You can download my resume here: <br>
                    <a href="../documents/resume.pdf" target="_blank">Download Resume</a>
                `;
                break;
            case 'certificate':
                result.innerHTML = `
                    Here are my Certificates: <br>
                    <a href="../documents/resume.pdf" target="_blank">Certificate 1</a><br>
                    <a href="../documents/resume.pdf" target="_blank">Certificate 2</a><br>
                    <a href="../documents/resume.pdf" target="_blank">Certificate 3</a><br>
                    <a href="../documents/resume.pdf" target="_blank">Certificate 4</a><br>
                    <a href="../documents/resume.pdf" target="_blank">Certificate 5</a><br>
                `;
                break;
            case 'contact':
                result.innerHTML = `
                    You can reach me via: <br>
                    - <strong>Email:</strong> <a href="mailto:rajvikash18113@gmail.com">rajvikash18113@gmail.com</a> <br>
                    - <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/rajvikash18113" target="_blank">linkedin.com/in/rajvikash18113</a> <br>
                    - <strong>GitHub:</strong> <a href="https://github.com/rajvikash18113" target="_blank">github.com/rajvikash18113</a>
                `;
                break;

            case 'banner':
                result.innerHTML = `
                    <pre>
                    __   __  _   _   ___    _    _   _
                    \\ \\ / / | | | | / __|  /_\\  | | | |
                     \\ V /  | |_| | \\__ \\ / _ \\ | |_| |
                      \\_/    \\___/  |___//_/ \\_\\ \\___/
                    </pre>
            `;
                break;
            case 'clear':
                output.innerHTML = '';
                return;
            default:
                result.innerHTML = `Command not found: ${command}. Type 'help' for a list of commands.`;
                break;
        }
        output.appendChild(result);
    }
});