<template>
  <div style="padding:20px">
    <div
      class="row"
      style="display:flex;justify-content:space-around;align-items:flex-start;margin-top:5%"
    >
      <div
        class
        style="display:flex;flex-direction:column;justify-content:center;max-height:1200px"
        v-if="product.userId != 0"
      >
        <div
          class="card"
          style="padding:35px;max-width:600px;background-color:#FFFFFF"
          v-if="product.userId != undefined"
        >
          <div class="card-header" style="height:47px;color:black;text-align:center;font-size:17px">
            <strong>{{ product.title }}</strong>
          </div>
          <div style="margin:20px;display:flex;align-items:center;justify-content:center">
            <img
              style="max-width:100%;height:auto;width:auto;max-height:230px"
              class="card-img-top"
              v-bind:src="product.images[0]"
              alt="Card image cap"
            />
          </div>

          <div
            class="card-header"
            style="height:47px;color:black;text-align:center"
          >Category: {{ product.category }}</div>
          <div class="card-body">
            <p style="color:black;text-align:center">
              <strong>Details</strong>
            </p>
            <blockquote class="blockquote mb-0">
              <p style="color:black;text-align:justify">{{ product.details }}</p>

              <footer class="blockquote-footer">
                <small style="color:black">
                  By {{ product.userId.name }} at
                  {{ product.createdAt.slice(0, 10) }}
                </small>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>

      <div class>
        <div
          class="card"
          style="padding:35px;width:600px;background-color:#FFFFFF;display:flex;justify-content:center;flex-direction:column;"
          v-if="product.userId != undefined"
        >
          <div
            class="card-header"
            style="height:47px;color:black;text-align:center;margin-bottom:20px;font-size:17px"
          >
            <strong>3D Model</strong>
          </div>

          <div style="display:flex;justify-content:center;flex-direction:column;padding:19px">
            <div style="display:flex;width:500px">
              <button class="btn btn-outline-dark" style="width:50%" @click="showShirt">SHIRT</button>
              <button class="btn btn-outline-dark" style="width:50%" @click="showMug">MUG</button>
            </div>

            <canvas id="hasilthreejs"></canvas>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="product.bid.bids"
      class="row"
      style="display:flex;justify-content:center;margin-top:5%"
    >
      <div class style="padding:35px;max-width:600px;">
        <div class="card" style="background-color:#FFFFFF;padding:30px">
          <h4
            style="color:black;text-align:center;margin-bottom:0px"
          >Initial Price: {{ format(Number(product.initialPrice)) }}</h4>
          <br />
          <div v-if=" product.closed !== true" style="color:blue;text-align:center;">
            <strong>Bid closed: {{countdownText}}</strong>
          </div>
                  <div v-if=" product.closed == true" style="color:red;text-align:center;">
            <strong>Bid closed!</strong>
          </div>

        </div>

        <div
          class="card"
          style="background-color:#FFFFFF;padding:30px"
          v-if="user._id != product.userId._id && product.closed !== true"
        >
          <div v-if="user._id != product.userId._id ">
            <h4 style="color:black;text-align:center;margin-bottom:30px">Start Bidding!</h4>
            <input
              v-model="value"
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Rp."
            />
            <div style="display:flex;justify-content:center">
              <button
                style="margin-top:20px;width:120px;border-radius:10px"
                @click="addBid"
                type="button"
                class="btn btn-primary"
              >BID</button>
            </div>
          </div>
        </div>
        <div
          class="card"
          style="background-color:#FFFFFF;padding:30px"
          v-if="user._id == product.userId._id && product.closed !== true "
        >
          <div v-if="user._id == product.userId._id ">
            <h4 style="color:black;text-align:center;margin-bottom:30px">Close Bid</h4>
            <div style="display:flex;justify-content:center">
              <button
                style="width:120px;border-radius:10px"
                @click="quick"
                type="button"
                class="btn btn-danger"
              >CLOSE BID</button>
            </div>
          </div>
        </div>
        <div
          class="card"
          style="background-color:#FFFFFF;padding:30px;"
          v-if="product.bid.bids.length !== 0"
        >
          <h4 style="color:black;text-align:center;margin-bottom:30px">Bid Lists</h4>
          <div v-for="bid in product.bid.bids" :key="bid._id">
            <div
              class="card"
              style="min-width:22rem;max-width:28rem;padding:20px;background-color:#00000010"
            >
              <h5 v-if="bid.bidderId == user._id" style="color:green" class="card-title">You Bid :</h5>
              <h5
                v-if="bid.bidderId !== user._id"
                style="color:blue"
                class="card-title"
              >User *****{{ bid.bidderId.slice(17,23)}} Bid :</h5>
              <p style="color:black" class="card-text">
                <strong>{{ format(Number(bid.price)) }}</strong>
              </p>
              <p
                v-if="bid.dateIssued"
                style="color:black;font-size:10px"
                class="card-text"
              >at {{ bid.dateIssued.toDate().toString().slice(0,24)}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import THREE from 'three'
// import MTLLoader from 'three-mtl-loader';
import { mapActions } from "vuex";
import axios from "axios";
import dbh from "../../FBConfig.js";
import Swal from "sweetalert2";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);
var mili = new Date();
mili.setSeconds(mili.getSeconds() + 10);

export default {
  name: "product-detail",
  props: ["islogin"],
  data() {
    return {
      countdownText: "",
      bidClosed: true,
      err: false,
      value: "",
      choosenImage:
        "http://cdn.shopify.com/s/files/1/0257/6087/products/Pikachu_Single_Front_dc998741-c845-43a8-91c9-c1c97bec17a4.png?v=1523938908"
    };
  },
  components: {},
  computed: {
    url() {
      return this.$store.state.url;
    },
    product() {
      return this.$store.state.product;
      //       let temp = this.$store.state.product;
      //  console.log(temp, '====')
      // temp.initialPrice = format(Number(temp.initialPrice))
      // if (this.$store.state.product.bid.bids.length != 0){
      //   this.$store.state.product.bid.bids.forEach((x,i) => {
      //     console.log(x, 'xx')
      //     temp.bid.bids[i].price = format(Number(x.price))
      //   })
      // }
      // console.log(temp, '====')
      // return temp
    },
    token() {
      return this.$store.state.token;
    },
    user() {
      return this.$store.state.user;
    }
  },
  watch: {
    product(newValue) {
      if (this.product.images[0]) {
        console.log(this.product.images[0]);
        console.log("ALVINNN");
        this.showShirt();

        const interval = setInterval(() => {
          let closedDate = moment(this.product.closedDate);
          let now = moment();
          let countdown = moment.duration(closedDate.diff(now));

          if (closedDate.diff(now) <= 0) {
            this.countdownText = closedDate.calendar(null, {
              sameDay: () => "[" + now.to(closedDate) + "]",
              sameElse: () => "[" + now.to(closedDate) + "]"
            });

            console.log(this.bidClosed);
            if (this.bidClosed == true) {
              Swal.fire({
                title: "Time's up!",
                text: `Bid Closed!`
              });
            }
            this.bidClosed = false;
            clearInterval(interval);
          } else {
            this.countdownText = closedDate.calendar(null, {
              sameDay: () => "[" + countdown.format() + "]",

              sameElse: () => "[" + now.to(closedDate) + "]"
            });
          }
        }, 1000);

        if (this.product.closed) {
          clearInterval(interval);
          this.FETCHPRODUCT();
        }
      }
    }
  },
  methods: {
    format(num) {
      var p = num.toFixed(2).split(".");
      return (
        "Rp. " +
        p[0]
          .split("")
          .reverse()
          .reduce(function(acc, num, i, orig) {
            return num == "-" ? acc : num + (i && !(i % 3) ? "." : "") + acc;
          }, "") +
        "," +
        p[1]
      );
    },
    setImage(params) {
      this.choosenImage = params;
    },
    ...mapActions(["FETCHPRODUCT"]),
    quick() {
      console.log();
      axios({
        method: "PATCH",
        url: `${this.url}/product/${this.product._id}/quickcountdown`,
        headers: { token: this.token }
      })
        .then(({ data }) => {
          // Swal.fire({
          //   title: "Done",
          //   text: `Bid Closed!`
          // });
          // this.FETCHPRODUCT(this.$route.params.id);
        })
        .catch(err => {
          //         Swal.fire({
          //   title: "Done",
          //   text: `Bid Closed!`
          // });
          this.FETCHPRODUCT(this.$route.params.id);
        });
    },
    addBid() {
      axios({
        method: "PATCH",
        url: `${this.url}/product/${this.product._id}/addbid`,
        data: { price: this.value },
        headers: { token: this.token }
      })
        .then(({ data }) => {
          // this.FETCHPRODUCT(this.$route.params.id);
          let arr1 = this.product.bid.bids;
          arr1.unshift({
            bidderId: this.user._id,
            dateIssued: new Date(),
            price: this.value
          });
          console.log(arr1, "arr");
          dbh
            .collection("biding")
            .doc(`${this.product.bid._id}`)
            .set({
              bids: arr1,
              createdAt: this.product.bid.createdAt,
              productId: this.product.bid.productId,
              updatedAt: this.product.bid.updatedAt,
              winnerId: this.product.bid.winnerId
            })
            .then(() => {
              Swal.fire({
                title: "Success!",
                text: `Bid ${this.format(Number(this.value))} Success!`
              });

              this.value = "";
              this.err = "";
            })
            .catch(err => console.log(err));
        })
        .catch(error => {
          Swal.fire({
            type: "error",
            title: error.response.data.message
          });
        });
    },
    clear() {
      console.log("clearrrrr ==");
      var canvas = document.getElementById("hasilthreejs");

      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    showShirt() {
      this.objectVisualizer("shirt.json", "hasilthreejs2").initApp();
    },
    showMug() {
      this.objectVisualizer("mug.json", "hasilthreejs").initApp();
    },
    objectVisualizer: function(assetName, el) {
      el = "hasilthreejs";
      var octx = {};
      var canvas = document.getElementById(el);
      var userRotation = new THREE.Vector3();
      var userZoom = new THREE.Vector3();
      var lastMousePosition;
      var renderer;
      var scene;
      var camera;
      var theAsset = assetName;
      // UNTUK GANTI ASSET
      var urlparams = location.search.split("?")[1]; //'shirt.json'
      if (urlparams) urlparams = urlparams.split(",");
      else urlparams = [];
      function geturlparam(index, nullv) {
        return urlparams.length > index
          ? urlparams[index] == "0"
            ? nullv
            : urlparams[index]
          : nullv;
      }
      var animMesh;

      var objColor = "#fff";
      function clamp(val, min, max) {
        return Math.min(Math.max(val, min ? min : 0), max ? max : 1);
      }
      function lerp(va, vb, vv) {
        return va + (vb - va) * vv;
      }
      function initGraph() {
        canvas = document.getElementById("hasilthreejs");
        console.log(canvas, "==");

        renderer = new THREE.WebGLRenderer({
          antialias: false,
          canvas: canvas
        });
        renderer.setClearColor(0xdddddd, 1);
        // document.body.style.margin = 0;
        // document.body.style.padding = 0;
        document.body.style.overflow = "auto";
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          35, // Field of view
          800 / 600, // Aspect ratio
          0.1, // Near plane
          10000 // Far plane
        );
        camera.position.set(0, 0, 10);
        camera.lookAt(scene.position);
        userZoom.z = camera.position.z;
        var lightIntensity = 0.5;
        //Add 2 point lights and an ambient light...
        var lightDist = 100;
        var lightColor = 0xffffff;
        var light = new THREE.PointLight(lightColor, lightIntensity);
        light.position.set(-lightDist * 2.0, 0, lightDist);
        scene.add(light);
        light = new THREE.PointLight(lightColor, lightIntensity);
        light.position.set(lightDist * 2.0, lightDist * 0.25, lightDist);
        scene.add(light);
        var light = new THREE.AmbientLight(); // soft white light
        light.color.setRGB(
          1.0 * lightIntensity,
          1.0 * lightIntensity,
          1.0 * lightIntensity
        );
        scene.add(light);
        var geometry = new THREE.BoxGeometry(90, 90, 90);
        var material = new THREE.MeshLambertMaterial({
          color: 0xff4500, //0x808080,//0xdddddd,//0x808080,//0xdddddd,
          side: THREE.DoubleSide
        });
        var skycube = new THREE.Mesh(geometry, material);
        scene.add(skycube);
      }
      function addEventListeners() {
        canvas.addEventListener(
          "webglcontextlost",
          function(event) {
            console.log("Lost GL context..");
            event.preventDefault();
            if (animRequestID) {
              // delete animRequestID;
            }
          },
          false
        );
        canvas.addEventListener(
          "webglcontextrestored",
          function(event) {
            console.log("GL context restored..");
            initApp();
          },
          false
        );
        var mouseDown = false;
        canvas.addEventListener("mousedown", function(evt) {
          mouseDown = true;
        });
        canvas.addEventListener("mouseup", function(evt) {
          mouseDown = false;
        });
        canvas.addEventListener("mousemove", function(evt) {
          if (!lastMousePosition)
            lastMousePosition = new THREE.Vector2(evt.clientX, evt.clientY);
          if (mouseDown) {
            userRotation.y = clamp(
              userRotation.y + (evt.clientX - lastMousePosition.x) * 0.01,
              -Math.PI * 5,
              Math.PI * 5
            );
            userRotation.x = clamp(
              userRotation.x + (evt.clientY - lastMousePosition.y) * 0.01,
              -Math.PI * 0.5,
              Math.PI * 0.5
            );
          }
          lastMousePosition.set(evt.clientX, evt.clientY);
        });
        // window.addEventListener("mousewheel", function(evt) {
        //   userZoom.z = clamp(userZoom.z + evt.wheelDelta * -0.01, 3, 15);
        // });
        var obj = canvas;
        var lastTouch;
        obj.addEventListener(
          "touchmove",
          function(event) {
            if (event.targetTouches.length == 1) {
              var touch = event.targetTouches[0];
              if (!lastTouch)
                lastTouch = new THREE.Vector2(touch.pageX, touch.pageY);
              userRotation.y = clamp(
                userRotation.y + (touch.pageX - lastTouch.x) * 0.01,
                -Math.PI * 5,
                Math.PI * 5
              );
              userRotation.x = clamp(
                userRotation.x + (touch.pageY - lastTouch.y) * 0.01,
                -Math.PI * 0.5,
                Math.PI * 0.5
              );
              lastTouch.set(touch.pageX, touch.pageY);
              event.preventDefault();
            }
          },
          false
        );
      }
      const loadObject = options => {
        var loader = new THREE.JSONLoader();
        var params = {
          meshPath: theAsset,
          color: 0xffffffff,
          shininess: 100,
          texPath: this.product.images[0]
        };
        THREE.ImageUtils.crossOrigin = "";
        console.log("/" + params.meshPath);
        loader.load("/" + params.meshPath, function(geometry) {
          console.log("!!!!!!!!!!!!!!!!!!!!");
          var texture = THREE.ImageUtils.loadTexture(
            //url texture
            params.texPath,
            // on load
            THREE.UVMapping,
            // on progress
            function() {
              texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
              var material = new THREE.MeshPhongMaterial({
                color: params.color,
                shininess: params.shininess,
                side: THREE.DoubleSide
              });
              var cdim = 2048;
              var canvas = document.createElement("canvas");

              canvas.width = canvas.height = cdim;
              console.log(canvas);
              var compositeTexture = new THREE.Texture(canvas);
              compositeTexture.wrapS = compositeTexture.wrapT =
                THREE.RepeatWrapping;
              function rebuildTexture() {
                var ctx = canvas.getContext("2d");
                ctx.globalCompositeOperation = "source-over";
                var fcolor = objColor;
                ctx.fillStyle = fcolor;
                ctx.fillRect(0, 0, cdim, cdim);
                ctx.globalCompositeOperation = "normal";
                var img = texture.image;
                var iwid = img.width;
                var ihite = img.height;
                var max = Math.max(iwid, ihite);
                var scl = (cdim / max) * 0.38;
                iwid *= scl;
                ihite *= scl;
                ctx.drawImage(
                  img,
                  cdim * 0.25 - iwid * 0.5,
                  cdim * 0.5 - ihite * 0.5,
                  iwid,
                  ihite
                );
                ctx.drawImage(
                  img,
                  cdim * 0.75 - iwid * 0.5,
                  cdim * 0.5 - ihite * 0.5,
                  iwid,
                  ihite
                );
                compositeTexture.needsUpdate = true;
                material.map = compositeTexture; //texture;
                material.needsUpdate = true;
              }
              rebuildTexture();
              function rebuildTask() {
                setTimeout(function() {
                  rebuildTexture();
                  rebuildTask();
                }, 2000);
              }
              rebuildTask();
              var mesh = new THREE.Mesh(geometry, material);
              mesh.rebuildTexture = rebuildTexture;
              animMesh = mesh;
              scene.add(mesh);
            }
          );
        });
      };
      var lerpyness = 0.1;
      var animRequestID;
      function renderFrame() {
        animRequestID = window.requestAnimationFrame(renderFrame);
        var width = "500";
        var height = "500";
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        camera.position.lerp(userZoom, lerpyness);
        if (animMesh) {
          animMesh.rotation.x = lerp(
            animMesh.rotation.x,
            userRotation.x,
            lerpyness
          );
          animMesh.rotation.y = lerp(
            animMesh.rotation.y,
            userRotation.y,
            lerpyness
          );
        }
        renderer.render(scene, camera);
      }
      addEventListeners();
      octx.initApp = function initApp() {
        initGraph();
        var meshPath = assetName;
        var shininess = 3000;
        loadObject({ meshPath: meshPath, shininess: shininess });
        renderFrame();
      };
      return octx;
    }
  },
  created() {
    console.log("detaill");

    console.log(this.$route.query);
    console.log(this.$router);
    this.FETCHPRODUCT(this.$route.params.id);
  }
};
</script>

    <style>
.canv {
  position: absolute;
  width: 300px;
  height: 200px;
}
.overlay {
  position: absolute;
  width: 300px;
  height: 200px;
}
</style>