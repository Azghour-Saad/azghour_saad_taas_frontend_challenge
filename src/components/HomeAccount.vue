<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        name
        <ChevronDownIcon class="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1" v-for="item in getRepo" :key="item.id">
          <MenuItem v-slot="{ active }">
            <a
              href="#"
              :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]"
              >{{ item.name }}</a
            >
          </MenuItem>

          <!-- <form method="POST" action="#">
            <MenuItem v-slot="{ active }">
              <button
                type="submit"
                :class="[
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  'block w-full text-left px-4 py-2 text-sm',
                ]"
              >
                Sign out
              </button>
            </MenuItem>
          </form> -->
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import * as config from "../config/config";
import data from "../../data/data.json";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";

// const GITHUB_CLIEN_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// const GITHUB_CLIEN_ID = config.development.GITHUB_CLIEN_ID;
// const GITHUB_CLIENT_SECRET = config.development.GITHUB_CLIENT_SECRET;
// const REDIRECT_URI = config.development.REDIRECT_URI;

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronDownIcon,
  },
  name: "HomeAccount",
  props: {},

  data() {
    return {
      config,
      code: this.$route.query.code,
      getRepo: data,
    };
  },

  mounted() {
    // console.log("Mounted Code!!", this.$route.query);
    // this.requestGithubToken();
    // this.getRepoUser();
  },

  methods: {
    async requestGithubToken() {
      // const myInit = {
      //   method: "POST",
      //   headers: {
      //     // Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   mode: "no-cors",
      // };
      // const resp = await fetch(
      //   `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIEN_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${GITHUB_CLIENT_SECRET}&code=${this.code}`,
      //   myInit
      // );
      // const resToken = await resp;
      // console.log("resToken", resToken);
      // .then(({ access_token }) => {
      //   console.log("Response access_token!!", access_token);
      // })
      // .then((paramsString) => {
      //   let params = new URLSearchParams(paramsString);
      // localStorage.setItem("access_token", access_token);
      // console.log(
      //   "access_token GITHUB",
      //   localStorage.getItem("access_token")
      // );
      // });
    },

    async getRepoUser() {
      // const myInit = {
      //   method: "GET",
      //   headers: {
      // Authorization: `Bearer ${token}`
      //     Authorization: `Bearer ${token}`,
      //   },
      //   mode: "no-cors",
      // };
      // const resRepo = await fetch(`https://api.github.com/user/repos`,
      //   myInit
      // );
      // console.log("repo res", resRepo);
      // });
    },

    getCode() {
      return this.$route.query.code;
    },
  },
};
</script>

<style scoped></style>
