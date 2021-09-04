var qrcode = new QRious({
    element: document.getElementById("qr__code"),
    background: '#ffffff',
    backgroundAlpha: 1,
    foreground: '#000000',
    foregroundAlpha: 1,
    level: 'H',
    padding: 0,
    size: 150
});

const selection = document.querySelector('.con-select');
const ssid_input = document.querySelector('#ssid')
const pwd_input = document.querySelector('#pwd')
const link_input = document.querySelector('#link-red')
const form = document.querySelector('form')
const eyes = document.querySelector('a')
const gen_btn = document.querySelector('#gen-btn')

selection.addEventListener('change', (e) => {
    if (e.target.value == 'link-con') {
        ssid_input.toggleAttribute('hidden', true)
        ssid_input.toggleAttribute('disabled', true)
        pwd_input.toggleAttribute('hidden', true)
        pwd_input.toggleAttribute('disabled', true)
        link_input.toggleAttribute('hidden', false)
        eyes.toggleAttribute('hidden', true)
    } else if (e.target.value == 'wifi-con') {
        ssid_input.toggleAttribute('hidden', false)
        ssid_input.toggleAttribute('disabled', false)
        pwd_input.toggleAttribute('disabled', false)
        pwd_input.toggleAttribute('hidden', false)
        link_input.toggleAttribute('hidden', true)
        eyes.toggleAttribute('hidden', false)
    }
})

// WIFI:T:WPA;S:homewifi_e88;P:15109054;;
link_input.addEventListener('keypress', (e) => {
    qrcode.value = e.target.value
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ssid = e.target[0].value
    const pwd = e.target[1].value
    const link = e.target[2].value
    console.log(ssid, pwd, link)
    if (ssid && pwd)
        qrcode.value = "WIFI:T:WPA;S:" + ssid + ";P:" + pwd + ";;"

    if (link)
        qrcode.value = link

    download_QR()

})

eyes.addEventListener('click', () => {
    let type = pwd_input.getAttribute('type')
    if (type == "password")
        pwd_input.setAttribute('type', 'text')
    else
        pwd_input.setAttribute('type', 'password')
})

const download_QR = () => {
    var link = document.createElement('a');
    link.download = 'QR_code.png';
    link.href = document.getElementsByTagName('canvas')[0].toDataURL()

    link.click();
}