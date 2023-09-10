<script>
    import { supabase } from "$lib/supabaseClient";
    import { page } from "$app/stores";
    export let data;

    const url = $page.url;
    console.log(url.searchParams.get('id'), "url test");
    const urlId = url.searchParams.get('id');

    let processed;
    let finished = false;

    async function loadData() {
        const { data } = await supabase.from("trees").select('*').eq("id", urlId);
        processed = JSON.parse(data[0].tree);
        console.log(processed, "processed");
    }

    loadData();

    let question = ""
    let questionIndex = 0;


    let yesHandler = () => {
        console.log(questionIndex, "yes");


        if (questionIndex === 0) { // if zero then init the question
            question = `am I ${processed[questionIndex].condition} ${processed[questionIndex].symptom}, "${processed[questionIndex].condition} ${processed[questionIndex].amHaveLook}"?`
            questionIndex++
        } else if (questionIndex > 0) {
            // set the question to instructions
            question = `I'm experiencing symptoms of my ${processed[questionIndex - 1].condition}`
            //  user instructions: ${processed[questionIndex - 1].instructions}, user contacts: ${processed[questionIndex - 1].contacts}
            finished = true;
        }

    }

    let noHandler = () => {
        console.log(questionIndex, "no");

        if (questionIndex > 0 && questionIndex < processed.length) { // if >0 then update the question
            question = `am I ${processed[questionIndex].condition} ${processed[questionIndex].symptom}, "${processed[questionIndex].condition} ${processed[questionIndex].amHaveLook}"?`
            questionIndex++
        } else if (questionIndex == 0) {
            question = "please call 911"
            questionIndex = 23289; // I'll change this later
        } else if (questionIndex = processed.length) {
            question = "I'm having an unusual emergency, please call 911 and tell them I have " + processed[questionIndex - 1].condition
            questionIndex = 23289; // I'll change this later
        }

        
    }
    
</script>

<main>
    <!-- if question index is zero, show the first 3 lines -->
    {#if questionIndex === 0}
        <div class="question">Hi, I'm Thomas.</div>
        <div class="question">I might be having a health problem.</div>
        <div id="test" class="question">Will you help me?</div>
    {/if}
    <div class="question">{question}</div>
    
    {#if finished}
    <div class="instructions question">Instructions: {processed[questionIndex - 1].instructions}</div>
    <button id="contact-button" on:click={yesHandler}>Please click here to call {processed[questionIndex - 1].contacts}</button>
    {:else if questionIndex < 100 }
        <button on:click={yesHandler}>Yes</button>
        <button id="no" on:click={noHandler}>No</button>
    {:else if questionIndex > 100 }
    <button>Tap here to call 911</button>

    {/if}
</main>    








<style>
    * {
        color: white;
    }

    main {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        gap: 16px;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100vw;
    }

    .question {
        font-size: 24px;
        text-align: center;
        margin: 0 16px;
        /* margin-bottom: 16px; */
    }

    /* select second instance of question  */
    .question:nth-of-type(3) {
        margin-bottom: 24px;
    }

    button {
        border: none;
        border-radius: 12px;
        background-color: #289642;
        padding: 12px;
        font-size: 24px;
        margin: 0 16px;
        
    }

    #no {
        background-color: #dc3545;
    }

    #test {
        font-weight: 700;
    }
</style>