<div class="detail-area">
    <div class="detail-area-header">
        <div class="msg-profile group">
            <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1">
                <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5" />
                <path d="M22 8.5l-10 7-10-7" />
                <path d="M2 15.5l10-7 10 7M12 2v6.5" /></svg>
        </div>
        <div class="detail-title">CodePen Group</div>
        <div class="detail-subtitle">Created by Aysenur, 1 May 2020</div>
    </div>
</div>

<style>
    .detail-area {
        width: 340px;
        flex-shrink: 0;
    }
    .detail-area {
        border-left: 1px solid var(--border-color);
        margin-left: auto;
        padding: 30px 30px 0 30px;
        display: flex;
        flex-direction: column;
        overflow: auto;
    }
    .detail-area-header {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .detail-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .detail-subtitle {
        font-size: 12px;
        font-weight: 600;
        color: var(--msg-date);
    }
    .detail-area input {
        background-color: transparent;
        border: none;
        width: 100%;
        color: var(--body-color);
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56.966 56.966' fill='%23c1c7cd'%3e%3cpath d='M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-size: 16px;
        background-position: 100%;
        font-family: var(--body-font);
        font-weight: 600;
        font-size: 14px;
        border-bottom: 1px solid var(--border-color);
        padding: 14px 0;
    }
    .detail-area input::placeholder {
        color: var(--detail-font-color);
    }
    @media (max-width: 1120px) {
        .detail-area {
            display: none;
        }
    }
</style>