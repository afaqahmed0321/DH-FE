import React from "react";

const serviceProvider = () => {
  return (
    <>
      <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" clipRule="evenodd" d="M4.06365 3.20483C3.47316 3.56438 2.90902 4.394 2.90902 5.94968V27.5346C2.90902 28.3625 3.61232 29.091 4.52353 29.091H15.316V9.32415C15.316 8.89146 15.1446 8.31718 14.791 7.75612C14.4379 7.19597 13.9882 6.78411 13.5856 6.58696L7.12757 3.41614C7.12732 3.41602 7.12782 3.41627 7.12757 3.41614C5.68998 2.71261 4.66118 2.84099 4.06365 3.20483ZM2.55074 0.720172C4.24033 -0.308623 6.36832 -0.194435 8.40662 0.803394L8.40815 0.804142L14.8647 3.97425C14.8644 3.9741 14.865 3.97441 14.8647 3.97425C15.8579 4.4608 16.6816 5.30003 17.252 6.20502C17.8219 7.10938 18.225 8.21506 18.225 9.32415V30.5455C18.225 31.3488 17.5738 32 16.7705 32H4.52353C2.06028 32 0 30.0231 0 27.5346V5.94968C0 3.69454 0.854019 1.75331 2.55074 0.720172Z" fill="#7D8695" />
  <path fillRule="evenodd" clipRule="evenodd" d="M15.8537 12.5741C16.1948 12.2979 16.6424 12.1905 17.0717 12.2819L17.7711 12.4307L24.3127 13.899L24.3164 13.8998L27.2627 14.5529C27.2622 14.5528 27.2631 14.553 27.2627 14.5529C28.3516 14.7923 29.5363 15.2309 30.4597 16.1621C31.4016 17.1121 31.9143 18.4117 31.9798 20.0557C31.9984 20.2198 31.9979 20.3629 31.9977 20.4352C31.9977 20.4419 31.9977 20.448 31.9977 20.4535V25.9515C31.9977 27.7184 31.5907 29.3173 30.4517 30.4563C29.3127 31.5953 27.7138 32.0023 25.9469 32.0023H16.769C15.9657 32.0023 15.3145 31.3511 15.3145 30.5478V13.7045C15.3145 13.2656 15.5126 12.8502 15.8537 12.5741ZM18.2235 15.5137L23.6794 16.7382L26.6358 17.3936L26.6384 17.3942C27.4691 17.5767 28.0305 17.8438 28.394 18.2104C28.7249 18.544 29.0401 19.1098 29.0748 20.2225C29.0765 20.2752 29.081 20.3277 29.0883 20.3799C29.0884 20.3835 29.0885 20.388 29.0885 20.3935L29.0887 20.4535V25.9515C29.0887 27.3264 28.7684 28.0256 28.3947 28.3993C28.0211 28.773 27.3218 29.0933 25.9469 29.0933H18.2235V15.5137Z" fill="#7D8695" />
  <path fillRule="evenodd" clipRule="evenodd" d="M5.13281 11.6342C5.13281 10.8309 5.78402 10.1797 6.58732 10.1797H11.6345C12.4378 10.1797 13.089 10.8309 13.089 11.6342C13.089 12.4375 12.4378 13.0887 11.6345 13.0887H6.58732C5.78402 13.0887 5.13281 12.4375 5.13281 11.6342Z" fill="#7D8695" />
  <path fillRule="evenodd" clipRule="evenodd" d="M5.13281 17.4545C5.13281 16.6512 5.78402 16 6.58732 16H11.6345C12.4378 16 13.089 16.6512 13.089 17.4545C13.089 18.2578 12.4378 18.909 11.6345 18.909H6.58732C5.78402 18.909 5.13281 18.2578 5.13281 17.4545Z" fill="#7D8695" />
  <path fillRule="evenodd" clipRule="evenodd" d="M16.5456 12.7096C16.8904 12.4336 17.342 12.3292 17.773 12.4259L24.3183 13.895C24.9824 14.044 25.4543 14.6336 25.4543 15.3142V19.9977C25.4543 22.6046 23.3341 24.7249 20.7272 24.7249C18.1203 24.7249 16 22.6046 16 19.9977V13.8452C16 13.4034 16.2007 12.9856 16.5456 12.7096ZM18.909 15.6623V19.9977C18.909 20.998 19.7269 21.8159 20.7272 21.8159C21.7275 21.8159 22.5453 20.998 22.5453 19.9977V16.4784L18.909 15.6623Z" fill="#7D8695" />
  <path fillRule="evenodd" clipRule="evenodd" d="M23.089 14.1796C23.433 13.9035 23.8836 13.7984 24.3142 13.8939L27.2642 14.5478C27.2647 14.5479 27.2651 14.548 27.2656 14.5481C28.3545 14.7875 29.5379 15.2258 30.4612 16.157C31.4176 17.1215 31.9315 18.4466 31.984 20.1265C31.9852 20.1663 31.9848 20.2061 31.9828 20.2458C31.8567 22.7272 29.8006 24.7246 27.2721 24.7246C24.6652 24.7246 22.5449 22.6043 22.5449 19.9974V15.3139C22.5449 14.8729 22.745 14.4556 23.089 14.1796ZM25.4539 17.1261V19.9974C25.4539 20.9977 26.2718 21.8156 27.2721 21.8156C28.2161 21.8156 28.999 21.0782 29.074 20.1521C29.0292 19.0824 28.7199 18.5323 28.3956 18.2053C28.0321 17.8387 27.4707 17.5716 26.64 17.3891L26.6373 17.3885L26.6373 17.3885L25.4539 17.1261Z" fill="#7D8695" />
</svg>

    </>
  );
};

export default serviceProvider;