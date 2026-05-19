new Vue({
  el: '#stokApp',

  data: {

    upbjjList: app.upbjjList,
    kategoriList: app.kategoriList,
    stok: app.stok,

    selectedUPBJJ: '',
    selectedKategori: '',
    sortBy: '',
    onlyWarning: false,
    searchQuery: '',

    form: {
      kode: '',
      judul: '',
      kategori: '',
      upbjj: '',
      lokasiRak: '',
      harga: '',
      qty: '',
      safety: '',
      catatanHTML: ''
    },

    editIndex: null,
    errorMessage: ''

  },

  computed: {

    filteredStok() {

      let data = [...this.stok]

      if (this.searchQuery) {
        let q = this.searchQuery.toLowerCase()
        data = data.filter(item => 
          item.judul.toLowerCase().includes(q) || 
          item.kode.toLowerCase().includes(q)
        )
      }

      if (this.selectedUPBJJ) {
        data = data.filter(
          item => item.upbjj === this.selectedUPBJJ
        )
      }

      if (this.selectedKategori) {
        data = data.filter(
          item => item.kategori === this.selectedKategori
        )
      }

      if (this.onlyWarning) {
        data = data.filter(
          item => item.qty < item.safety
        )
      }

      if (this.sortBy) {

        data.sort((a, b) => {

          if (a[this.sortBy] > b[this.sortBy]) return 1
          if (a[this.sortBy] < b[this.sortBy]) return -1

          return 0
        })
      }

      return data
    },

    stokMenipis() {

      return this.stok.filter(
        item => item.qty < item.safety && item.qty > 0
      ).length
    },

    stokKosong() {

      return this.stok.filter(
        item => item.qty === 0
      ).length
    }

  },

  methods: {

    resetFilter() {

      this.selectedUPBJJ = ''
      this.selectedKategori = ''
      this.sortBy = ''
      this.onlyWarning = false
      this.searchQuery = ''

    },

    saveData() {

      if (
        !this.form.kode ||
        !this.form.judul ||
        !this.form.kategori ||
        !this.form.upbjj
      ) {

        this.errorMessage = 'Semua field wajib diisi'
        return
      }

      this.errorMessage = ''

      if (this.editIndex !== null) {

        this.stok.splice(
          this.editIndex,
          1,
          { ...this.form }
        )

        this.editIndex = null

      } else {

        this.stok.push({ ...this.form })
      }

      this.form = {
        kode: '',
        judul: '',
        kategori: '',
        upbjj: '',
        lokasiRak: '',
        harga: '',
        qty: '',
        safety: '',
        catatanHTML: ''
      }
    },

    editData(index) {

      this.form = { ...this.stok[index] }
      this.editIndex = index

    }

  },

  watch: {

    selectedUPBJJ(newValue) {
      console.log('UPBJJ:', newValue)
    },

    onlyWarning(newValue) {
      console.log('Warning:', newValue)
    }

  }

})