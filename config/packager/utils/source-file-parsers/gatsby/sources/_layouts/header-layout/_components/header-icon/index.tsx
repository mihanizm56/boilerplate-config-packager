import React, { memo } from 'react';

export const HeaderIcon = memo(() => (
  <svg
    fill="none"
    height="30"
    viewBox="0 0 250 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.05349 30.6112L0 1.61911H4.92364L10.9112 24.2762L17.3688 1.61911H21.6863L28.1192 24.2762L34.0943 1.61911H39.018L30.9645 30.6112H25.5584L19.5337 9.44016L13.472 30.6112H8.05349Z"
      fill="white"
    />
    <path d="M42.4492 1.61911H47.1254V30.6112H42.4492V1.61911Z" fill="white" />
    <path
      d="M57.9458 26.052H69.5373V30.6112H53.2695V1.61911H57.9458V26.052Z"
      fill="white"
    />
    <path
      d="M83.5954 1.61911C87.5047 1.61911 90.7582 3.02967 93.319 5.80041C95.9293 8.57116 97.2282 12.0094 97.2282 16.1151C97.2282 20.1705 95.9293 23.6087 93.319 26.4299C90.7582 29.2006 87.5047 30.6112 83.5954 30.6112H72.4121V1.61911H83.5954ZM83.5954 26.052C86.2799 26.052 88.482 25.0949 90.152 23.2309C91.8592 21.367 92.7128 18.9614 92.7128 16.1025C92.7128 13.2059 91.8592 10.8381 90.152 8.97417C88.482 7.11022 86.2923 6.15305 83.5954 6.15305H77.0883V26.0394H83.5954V26.052Z"
      fill="white"
    />
    <path
      d="M122.303 22.3241C122.303 24.6793 121.487 26.6692 119.817 28.2434C118.147 29.8177 116.155 30.5986 113.755 30.5986H101.545V1.61911H112.864C115.178 1.61911 117.182 2.39996 118.765 3.93646C120.398 5.47296 121.202 7.3747 121.202 9.65427C121.202 12.1857 120.225 14.1252 118.308 15.5736C120.794 16.896 122.303 19.3015 122.303 22.3241ZM106.234 6.09008V13.7096H112.864C114.943 13.7096 116.526 12.0472 116.526 9.89356C116.526 7.73993 114.943 6.07749 112.864 6.07749H106.234V6.09008ZM113.755 26.1402C115.908 26.1402 117.615 24.3644 117.615 22.0848C117.615 19.8053 115.908 18.0295 113.755 18.0295H106.234V26.1402H113.755Z"
      fill="white"
    />
    <path
      d="M131.192 26.052H143.81V30.6112H126.516V1.61911H143.6V6.17824H131.192V13.7222H142.585V18.2436H131.192V26.052Z"
      fill="white"
    />
    <path
      d="M164.385 30.6112L158.36 20.0446H152.831V30.6112H148.154V1.61911H159.548C162.109 1.61911 164.274 2.5259 166.018 4.35207C167.812 6.12786 168.702 8.33186 168.702 10.9389C168.702 14.629 166.426 17.9791 163.049 19.3519L169.519 30.6238H164.385V30.6112ZM152.831 6.09008V15.7877H159.548C162.034 15.7877 164.026 13.6341 164.026 10.9389C164.026 8.24371 162.034 6.09008 159.548 6.09008H152.831Z"
      fill="white"
    />
    <path
      d="M189.356 30.6112L183.331 20.0446H177.801V30.6112H173.125V1.61911H184.519C187.079 1.61911 189.244 2.5259 190.989 4.35207C192.782 6.12786 193.673 8.33186 193.673 10.9389C193.673 14.629 191.397 17.9791 188.02 19.3519L194.49 30.6238H189.356V30.6112ZM177.789 6.09008V15.7877H184.506C186.993 15.7877 188.985 13.6341 188.985 10.9389C188.985 8.24371 186.993 6.09008 184.506 6.09008H177.789Z"
      fill="white"
    />
    <path d="M198.096 1.61911H202.772V30.6112H198.096V1.61911Z" fill="white" />
    <path
      d="M213.592 26.052H226.211V30.6112H208.916V1.61911H226V6.17824H213.592V13.7222H224.986V18.2436H213.592V26.052Z"
      fill="white"
    />
    <path
      d="M228.891 23.7188L232.924 21.3133C234.062 24.5878 236.425 26.1998 240 26.1998C243.538 26.1998 245.294 24.6633 245.294 22.3838C245.294 21.1873 244.812 20.3183 243.872 19.6886C242.932 19.0715 241.224 18.3662 238.824 17.6231C236.103 16.7919 234.754 16.2504 232.849 14.9657C231.018 13.6433 230.078 11.729 230.078 9.12199C230.078 6.55275 230.969 4.52507 232.763 3.03894C234.544 1.51504 236.697 0.771973 239.22 0.771973C243.773 0.771973 247.323 3.17748 249.154 7.15728L245.208 9.47463C244.033 6.77945 242.029 5.41927 239.233 5.41927C236.511 5.41927 234.754 6.82983 234.754 9.02123C234.754 11.1749 236.14 12.1698 240.495 13.5426C241.596 13.9204 242.363 14.1597 242.857 14.3738C243.389 14.5375 244.082 14.8272 244.973 15.205C245.913 15.5829 246.606 15.9859 247.051 16.3637C248.56 17.5602 250.181 19.5501 249.983 22.3334C249.983 24.9404 249.043 27.0563 247.175 28.5928C245.344 30.1293 242.907 30.8723 239.888 30.8723C234.383 30.8471 230.388 28.152 228.891 23.7188Z"
      fill="white"
    />
  </svg>
));
