document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.getElementById('command-input');
    const output = document.getElementById('output');
    const prompt = document.querySelector('.prompt');

    // Focus the input field when the user clicks anywhere on the terminal
    document.getElementById('terminal').addEventListener('click', () => {
        commandInput.focus();
    });

    // Listen for the 'Enter' key
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim().toLowerCase();

            // Echo the command to the output
            const commandEcho = document.createElement('div');
            commandEcho.innerHTML = `<span class="prompt">${prompt.textContent}</span> <span class="command-echo">${command}</span>`;
            output.appendChild(commandEcho);

            // Process the command
            processCommand(command);

            // Clear the input field
            commandInput.value = '';

            // Scroll to the bottom of the output
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
                    - <strong>resume</strong>: Get my Resume. <br>
                    - <strong>certificate</strong>: See my certifications. <br>
                    - <strong>clear</strong>: Clear the terminal.
                `;
                break;

            // ---------- CUSTOMIZE THE CONTENT BELOW! -----------
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

            // -----------------------------------------------------

            case 'clear':
                output.innerHTML = '';
                return; // Stop here to not add an empty div

            default:
                result.innerHTML = `Command not found: ${command}. Type 'help' for a list of commands.`;
                break;
        }

        output.appendChild(result);
    }
});