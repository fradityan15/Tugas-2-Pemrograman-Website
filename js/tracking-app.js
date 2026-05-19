new Vue({

  el: '#trackingApp',

  data: {

    pengirimanList: app.pengirimanList,
    paket: app.paket,

    selectedPaket: '',

    trackingList: app.tracking ? Object.keys(app.tracking).map(key => Object.assign({ noDO: key }, app.tracking[key])) : [],
    searchDO: '',
    foundDO: null,

    form: {
      noDO: '',
      nim: '',
      nama: '',
      ekspedisi: '',
      tanggalKirim: '',
      paket: '',
      total: 0
    }

  },

  computed: {
  },

  methods: {

    cekStatus() {
      if (!this.searchDO) return;
      let result = this.trackingList.find(item => item.noDO.toLowerCase() === this.searchDO.toLowerCase().trim());
      if (result) {
        this.foundDO = result;
      } else {
        this.foundDO = null;
        alert('Nomor DO tidak ditemukan!');
      }
    },

    generateDO() {

      let nomor = this.trackingList.length + 1
      let tahun = new Date().getFullYear()

      return `DO${tahun}-${String(nomor).padStart(3, '0')}`
    },

    tambahDO() {

      if (
        !this.form.nim ||
        !this.form.nama ||
        !this.selectedPaket
      ) {

        alert('Lengkapi form')
        return
      }

      this.form.noDO = this.generateDO()

      this.form.paket = this.selectedPaket.nama

      this.trackingList.push({
        ...this.form
      })

      this.form = {
        noDO: this.generateDO(),
        nim: '',
        nama: '',
        ekspedisi: '',
        tanggalKirim: '',
        paket: '',
        total: 0
      }

      this.selectedPaket = ''
    }

  },

  watch: {

    selectedPaket(newValue) {

      if (newValue) {
        this.form.total = newValue.harga
      }

    }

  },

  mounted() {

    this.form.noDO = this.generateDO()

    this.form.tanggalKirim =
      new Date().toISOString().substr(0, 10)

  }

})