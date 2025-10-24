    let x_turn = true
    let o_turn = false
    let board = Array(9).fill(null)
    let winning_combn = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
    ]
    let isWin = false
    let isDraw = false

    function cell_clicked(cell) {
        if(x_turn) {
            //To prevent Overwriting
            if (cell.querySelector('svg')) {
                return;
            }
            if (cell.textContent == '') {
                //cell.textContent ='X'
                //cell.style.color = 'white'

                // parseInt converts string to number
                
                const x_svg = document.createElement('div')
                x_svg.innerHTML = 
                // viewBox -> x coordinate of left top, y coordinate of right top, width, height
                `
                <svg class='x_mark' viewBox= "0 0 100 100"> 
                    <line x1 = "20" y1="20" x2 = "70" y2 = "70"/>
                    <line x1 = "70" y1="20" x2= "20" y2="70"/>
                </svg>
                `;

                /* Adding the above thing, the HTML looks like this:
                <div class="cell">
                    <div>
                        <svg class="x_mark">...</svg>
                    </div>
                </div> */

                cell.appendChild(x_svg)
                cell.classList.remove('no_element')
                x_turn = false
                o_turn = true

                const index = parseInt(cell.dataset.cellIndex)-1
                board[index] = 'x'
                check_win('x')

                if(isWin) {
                    document.querySelectorAll('.cell.no_element').forEach(c => {
                        c.classList.remove('x_turn')
                        document.querySelector('.player_turn').innerHTML = `Player X Wins!`;
                    })
                }
                if(!isWin && !isDraw) {
                    document.body.style.backgroundColor ='#0a001a'; //Red Shade
                    document.querySelector('.player_turn').innerHTML = `Player O's Turn`;

                    //Update hover state for remaning empty cells
                    document.querySelectorAll('.cell.no_element').forEach(c => {
                        c.classList.remove('x_turn')
                        c.classList.add('o_turn')
                    })
            }
            }
        }
        if(o_turn) {
            // To prevent Overwriting
            if (cell.querySelector('svg')) {
                return;
            }
            if (cell.textContent == '') {
                //cell.textContent ='O'
                //cell.style.color = 'blue'

                const o_svg = document.createElement('div')
                o_svg.innerHTML = `
                <svg class="o_mark" viewBox = "0 0 100 100">
                    <circle cx = "55" cy="50" r = "30"/>
                </svg>
                `;

                cell.appendChild(o_svg)
                cell.classList.remove('no_element')
                x_turn = true
                o_turn = false

                const index = parseInt(cell.dataset.cellIndex) - 1
                board[index] = 'o'
                check_win('o')

                if(isWin) {
                    document.querySelectorAll('.cell.no_element').forEach(c => {
                        c.classList.remove('o_turn')
                        document.querySelector('.player_turn').innerHTML = `Player O Wins!`;

                    })
                }

                if(!isWin && !isDraw) {
                    document.body.style.backgroundColor = '#1a0000' ; // Blue Shade
                    document.querySelector('.player_turn').innerHTML = `Player X's Turn`;

                    document.querySelectorAll('.cell.no_element').forEach( c => {
                        c.classList.remove('o_turn')
                        c.classList.add('x_turn')
                    })
                }
            }
        }
    
    }
    function check_win(element) {
        for (let combn of winning_combn) {
            const [a,b,c] = combn
            if((board[a] === board[b] && board[a]===board[c]) && (board[a] === 'x' || board[a] === 'o')) {
                console.log(`${board[a]} Wins!`)
                x_turn = false
                o_turn = false
                isWin = true
                // It is to handle the win for x and there is cells empty cells.
                document.querySelector('.player_turn').innerHTML = `Player X Wins!`;

                setTimeout(() =>winning_line(combn),1000)

                const restart_button = document.querySelector('.play_again')
                setTimeout(() => {
                    restart_button.style.display = 'block';
                },1500);

                
            }
        }
        if (!board.includes(null) && !isWin) {
            document.querySelector('.player_turn').innerHTML = `It's a Draw!`;
            console.log("Draw")
            isDraw = true

            const restart_button = document.querySelector('.play_again')
            setTimeout(() => {
                restart_button.style.display = 'block';
            },1500);
        }
    }
    function play_again_clicked() {
        x_turn = true
        o_turn = false
        isWin = false
        isDraw = false
        board = Array(9).fill(null)

        document.querySelectorAll('.cell').forEach(cell => {
            const svg_element = cell.querySelector('div')
            if(svg_element) {
                cell.removeChild(svg_element)
            }
            cell.classList.add('no_element', 'x_turn')
            cell.classList.remove('o_turn')
        })

        const line = document.querySelector('.winning_line')
        if (line) {
            line.classList.remove('active')
            // Even though some styling like rotation, width is given in style tag or separate JS file, these style r considered as inline styling.
            // Thats y we have to remove.
            line.style.cssText = ''
        }
        document.querySelector('.play_again').style.display = 'none';

        document.querySelector('.player_turn').innerHTML = "Player X's Turn"
        document.body.style.backgroundColor = '#1a0000';
    }

    function winning_line(combn) {
        const line = document.querySelector('.winning_line');

        switch(combn.join(',')) {
        // Horizontal Lines
        case '0,1,2':
            line.style.top = '150px';
            line.style.left = '20px';
            line.style.width = '450px';
            line.style.transform = 'rotate(0deg)';
            break;

        case '3,4,5':
            line.style.top = '275px';
            line.style.left = '20px';
            line.style.width = '450px';
            line.style.transform = 'rotate(0deg)';
            break;

        case '6,7,8':
            line.style.top = '410px';
            line.style.left = '20px';
            line.style.width = '450px';
            line.style.transform = 'rotate(0deg)';
            break;

        // Vertical Lines
        case '0,3,6':
            line.style.top = '50px';
            line.style.left = '115px';
            line.style.width = '450px';
            line.style.transform = 'rotate(90deg)';
            break;

        case '1,4,7':
            line.style.top = '50px';
            line.style.left = '245px';
            line.style.width = '450px';
            line.style.transform = 'rotate(90deg)';
            break;

        case '2,5,8':
            line.style.top = '50px';
            line.style.left = '375px';
            line.style.width = '450px';
            line.style.transform = 'rotate(90deg)';
            break;

        // Diagonals
        case '0,4,8': 
            line.style.top = '95px';
            line.style.left = '60px';
            line.style.width = '550px';
            line.style.transform = 'rotate(45deg)';
            break;
        case '2,4,6':
            line.style.top = '85px';
            line.style.left = '437px';
            line.style.width = '550px';
            line.style.transform = 'rotate(135deg)';
            break;
        }


    }


