let globalEditID;
$(document).ready(function() {
  // Activate tooltip
  $('[data-toggle="tooltip"]').tooltip();
  loadTable(data);
});

function loadTable(array) {
  $("#body").empty();
  for (let i = 0; i < array.length; i++) {
    $("#body").append(
      `<tr>` +
      `<td>${array[i].ad}</td>` + // Adi
      `<td>${array[i].soyad}</td>` + // Soyadi
      `<td>${array[i].yas}</td>` + // yas
        `<td>` +
        `   <a href="#" data-id="${array[i].id}" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>` +
        `   <a href="#" class="delete" data-index="${i}" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>` +
        `</td>` +
        `</tr>`
    );
  }
  $('[data-toggle="tooltip"]').tooltip();
}
$(document).on("click", "#modalEkle", function() {
  $("#addModalTitle").text("Ekle");
  $("#ekle").val("Ekle");
});
$(document).on("click", "#ekle", function() {
  let val = $(this).val();
  console.log(val);
  if (val == "Ekle") {
    ekle();
  } else {
    duzenle(globalEditID);
  }
});

function ekle() {
  let ad = $("#ad").val(); // değer alma  // $("#ad").val("gazihan"); // -->> değer atama
  let soyad = $("#soyad").val();
  let yas = $("#yas").val();

  axios
    .post(
      "https://munhasir-ad882-default-rtdb.firebaseio.com/addNewPerson.json",
      {
        id: 1,
        ad: ad,
        soyad: soyad,
        yas: yas,
      }
    )
    .then((res) => {
      if (res.status === 200) {
        alert("Yupppii!! başarılı");
      }
    });
  data.push({
    // eklemek
    id: data[data.length - 1].id + 1,
    ad: ad,
    soyad: soyad,
    yas: yas,
  });
  loadTable(data); // tabloyu doldur
  $("#addEmployeeModal").modal("hide"); // modalın kapanması
  temizle();
}

function bul(id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      $("#ad").val(data[i].ad);
      $("#soyad").val(data[i].soyad);
      $("#yas").val(data[i].yas);
    }
  }
}
$(document).on("click", ".edit", function() {
  $("#addModalTitle").text("Düzenle");
  $("#ekle").val("Düzenle");
  let id = $(this).attr("data-id");
  $("#addEmployeeModal").modal("show"); // modalın açılması
  temizle();
  globalEditID = id;
  bul(id);
});

function duzenle(id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      // buldum
      data[i].ad = $("#ad").val();
      data[i].soyad = $("#soyad").val();
      data[i].yas = $("#yas").val();
    }
  }
  loadTable(data); // tabloyu doldur
  $("#addEmployeeModal").modal("hide"); // modalın kapanması
  temizle();
}
$(document).on("click", ".delete", function() {
  let index = $(this).attr("data-index");
  data.splice(index, 1);
  loadTable(data); // tabloyu doldur
});

function ara(kelime) {
  let array = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].ad.includes(kelime)) {
      array.push(data[i]);
    }
  }
  loadTable(array);
}
$(document).on("keyup", "#search", function(e) {
  let val = $(this).val();
  if (e.keyCode === 13) {
    e.preventDefault();
    console.log(val);
    if (val == "") {
      console.log("val bos");
      loadTable(data);
    } else {
      ara(val);
    }
  }
});
function ara(kelime) {
  let array = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].soyad.includes(kelime)) {
      array.push(data[i]);
    }
  }
  loadTable(array);
}
$(document).on("keyup", "#search", function(e) {
  let val = $(this).val();
  if (e.keyCode === 13) {
    e.preventDefault();
    console.log(val);
    if (val == "") {
      console.log("val bos");
      loadTable(data);
    } else {
      ara(val);
    }
  }
});

const data = [];

function getBackEndData() {
  // axios.post("https://munhasir-ad882-default-rtdb.firebaseio.com/ahmet.json", {
  //   isim: "Ahmet",
  //   soyAd: "Sarıdağ",
  // })
  //   axios
  //     .get("https://munhasir-ad882-default-rtdb.firebaseio.com/ahmet.json")
  //     .then((ahmet) => {
  //       console.log(ahmet);
  //     });
  //   .then((result) => {
  //     console.log(result)
  //   }).catch((err) => {
  //       console.log(err.message)
  //   });;
  /*  
   Veritabanına veri göndermeyi sağlıyor
   post


   Veritabanından veri almayı sağlıyor
   get

   Veritabanınındaki veriyi değiştirmeyi sağlıyor
   put 

   Veritabanınındaki veriyi silmeyi sağlıyor
   remove
      
   */
  // post örnekleri
  //    axios.post('Nereye göndericeksin adres belirt?' , 'Ne göndericeksin veri ver?')
  //  axios.post('https://munhasir-ad882-default-rtdb.firebaseio.com/ahmet.json' , 'Ahmet')
  // get örnekleri
  // get örnekleri
  //  axios.get("https://munhasir-ad882-default-rtdb.firebaseio.com/homeData.json");
  //   axios
  //     .get(
  //       "https://munhasir-ad882-default-rtdb.firebaseio.com/userProfileDATA.json"
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  axios
    .get("https://munhasir-ad882-default-rtdb.firebaseio.com/addNewPerson.json")
    .then((res) => {
      let dataGet = res.data;
      for (let key in dataGet) {
        data.push({ firebaseId: key, ...dataGet[key] });
      }
      loadTable(data);
    });
}

getBackEndData();

function temizle() {
  $("#ad").val("");
  $("#soyad").val("");
  $("#yas").val("");
}
