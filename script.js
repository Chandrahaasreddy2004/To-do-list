let add_button = document.getElementsByClassName("add")[0];
let text = document.getElementsByClassName("form-control")[0];
let add_parent = document.getElementsByClassName("add-todo")[0];
let update_progress = document.getElementsByClassName("progress-bar progress-bar-striped active")[0];
let progress = document.getElementsByClassName("progress")[0];
progress.style.visibility = "hidden";

//  create a task
function create_task(new_text,add)
        {
           // store in local storage
           function saveTasks(task,add)
           {
            if (add==1)
                {
                    let storedData = JSON.parse(localStorage.getItem('data')) || [];
                    storedData.push(task);
                    localStorage.setItem('data', JSON.stringify(storedData));
                }
           }
           saveTasks(new_text,add);

           function DeleteTask(task)
           {
                let storedData =  JSON.parse(localStorage.getItem('data'));
                let ind = storedData.findIndex((each_task)=>{ each_task === task});
                storedData.splice(ind,1);
                localStorage.setItem('data', JSON.stringify(storedData));
           }

        let create_div = document.createElement("div");
        create_div.classList.add("style");

        let craete_h2 = document.createElement("h2");
        craete_h2.innerText = new_text;

        let checkbox_trash = document.createElement("div");
        checkbox_trash.classList.add("checktrash-flex");

        // Create check box
        let checkbox_div = document.createElement("div");
        checkbox_div.classList.add("form-check");
        let checkbox_input = document.createElement("input");
        checkbox_input.setAttribute("type","checkbox");
        checkbox_input.classList.add("form-check-input");
        checkbox_div.appendChild(checkbox_input);

        
        let trashIcon = document.createElement("i");
        trashIcon.classList.add("fa", "fa-trash");
        trashIcon.setAttribute("aria-hidden", "true");

        //add checkbox and trash to checkbox_trash
        checkbox_trash.appendChild(checkbox_div);
        checkbox_trash.appendChild(trashIcon);


        create_div.appendChild(craete_h2);
        create_div.appendChild(checkbox_trash);
        add_parent.appendChild(create_div);

        text.value="";

        // check no of checkboxes clicked when a new event is occured

        function check_clicked()
        {

            let total_clicks = document.getElementsByClassName("form-check-input");
            let  clicked= 0;
            let all_info=[];
            for(let i=0;i<total_clicks.length;i++)
                {
                    if (total_clicks[i].checked)
                        {
                            clicked+=1;
                        }
                }
                all_info.push((clicked/total_clicks.length)*100);
                all_info.push(clicked);
                all_info.push(total_clicks.length);
                return all_info;
            }

        function update_progess_bar(all_info)
        {
            if (all_info[2]==0)
                {
                    progress.style.visibility = "hidden";
                }
            else{
            progress.style.visibility = "visible";
            update_progress.style.width = `${all_info[0]}%`; 
            let complete_tasks =  all_info.slice(1, 3).join('/')
            update_progress.innerText = `${complete_tasks} completed...`;
            }
        }

        let check = check_clicked();
        update_progess_bar(check);


        //add event listener to check total clicks

        checkbox_input.addEventListener("click",()=>{
            let check_clicks = check_clicked();
            update_progess_bar(check_clicks);
        });

        trashIcon.addEventListener("click",(event)=>{
            DeleteTask( event.target.parentElement.parentElement.innerText);
            event.target.parentElement.parentElement.remove();
            let check = check_clicked();
            console.log(check);
            update_progess_bar(check);
        });
        };



add_button.addEventListener("click",()=>{
    let new_text = text.value;
    let add=1;
    if (new_text.length==0)
        {
            alert("Provide the details...")
        }
    else{
        
        create_task(new_text,1);
    }
})



// get items


document.addEventListener('DOMContentLoaded', () => {
    let items = localStorage.getItem("data");

    if (items) {
        items = JSON.parse(items); // Parse the string into an array
    
        items.forEach(element => {
            create_task(element, 0);
        });
    }
       }
);

