<div class="chat-area-footer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip">
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
    <input type="text" placeholder="Type something here..." />
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...$$props}>
        <path fill="currentColor" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
    </svg>
</div>

<style>
    .chat-area-footer {
        display: flex;
        border-top: 1px solid var(--border-color);
        width: 100%;
        padding: 10px 20px;
        align-items: center;
        background-color: var(--theme-bg-color);
        position: sticky;
        bottom: 0;
        left: 0;
    }

    .chat-area-footer svg {
        color: var(--settings-icon-color);
        width: 20px;
        flex-shrink: 0;
        cursor: pointer;
    }
    .chat-area-footer svg:hover {
        color: var(--settings-icon-hover);
    }
    .chat-area-footer svg + svg {
        margin-left: 12px;
    }

    .chat-area-footer input {
        border: none;
        color: var(--body-color);
        background-color: var(--input-bg);
        padding: 12px;
        border-radius: 6px;
        font-size: 15px;
        margin: 0 12px;
        width: 100%;
    }
    .chat-area-footer input::placeholder {
        color: var(--input-chat-color);
    }
</style>