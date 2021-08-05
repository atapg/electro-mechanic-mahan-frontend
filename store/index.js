export const state = () => ({
  user: null,
  siteInfo: {
    _id: '610c15b62df205c89930ac14',
    phone: 12345678,
    phone2: 12345678,
    telephone: 12345678,
    address: 'adessssssssssssssodjsaudspdjasdanda',
    name: 'filane',
    lastName: 'dasdada',
    email: 'atatiata@gmailc.om',
    title: 'ELECTRO MECHANIC MAHAN',
    brand: 'Electro mechanic mahan',
    brandPer: 'الکترو مکانیک ماهان',
    socials: [
      { info: '@aisjdiaa', icon: 'mdi-instagram' },
      { info: '+9831231', icon: 'mdi-whatsapp' },
      { info: '+38247329842', icon: 'mdi-telegram' },
    ],
    logo: 'https://mindbodyshe.com/wp-content/uploads/2018/07/samples-of-logo-designs-sample-of-company-logo-design-ngo-logo-design-samples.jpg',
    hero_bg:
      'https://www.accurl.com/wp-content/uploads/2018/03/6-Axis-CNC-Hydraulic-Press-Brake-Bending-Machine.jpg',
    nav_items: [
      { title: 'Home', url: '/' },
      { title: 'About', url: '/about' },
      { title: 'Services', url: '/ser' },
      { title: 'Login', url: '/lo' },
    ],
    typings: [
      'الکترو مکانیک ماهان',
      'ساخت انواع دستگاه های پرس داغی و هیدرولیکی',
      'ساخت انواع دستگاه های چاپ',
    ],
  },
})

export const mutations = {
  addUser(state, user) {
    state.user = user
  },
}
