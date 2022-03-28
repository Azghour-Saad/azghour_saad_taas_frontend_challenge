<template>
  <div>
    <div class="flex flex-wrap mb-4 space-x-4">
      <div
        class="flex items-center justify-start ml-4 font-sans text-black bg-white"
      >
        <div class="flex overflow-hidden border rounded">
          <input
            type="text"
            class="px-4 py-2"
            placeholder="Start searching by name..."
            v-model="search"
          />
          <button class="flex items-center justify-center px-4 border-l">
            <svg
              class="w-4 h-4 text-grey-dark"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
              />
            </svg>
          </button>
        </div>
      </div>
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm md:visible hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
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
            class="absolute right-0 w-56 mt-2 overflow-y-auto origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-80"
          >
            <div class="py-1" v-for="item in filterByName" :key="item.id">
              <MenuItem v-slot="{ active }" as="div">
                <div
                  @click="showCommit(item.name), showCommitBgJs(item.name)"
                  :class="[
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm',
                  ]"
                >
                  {{ item.name }}
                </div>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>

    <div v-if="isLoading">
      <div v-for="commit in commitInfo" :key="commit.hash">
        <CommitHistory
          v-if="currentRepo === 'crud_agenda'"
          :commitMessage="commit.commitMessage"
          :authorOfCommit="commit.authorOfCommit"
          :dateOfCommit="commit.dateOfCommit"
          :authorAvatar="commit.authorAvatar"
        />
      </div>

      <div v-for="commit in commitInfoBgJs" :key="commit.hash">
        <CommitHistory
          v-if="currentRepo === 'beginner-javascript'"
          :commitMessage="commit.commitMessage"
          :authorOfCommit="commit.authorOfCommit"
          :dateOfCommit="commit.dateOfCommit"
          :authorAvatar="commit.authorAvatar"
        />
      </div>
      <div
        v-if="commitInfoBgJs.length || commitInfo.length"
        v-observe-visibility="handleInfinityScroll"
      ></div>
    </div>
    <div v-else>
      <Loading />
    </div>
  </div>
</template>

<script>
import * as config from "../config/config";
import repo from "../../data/getRepoData.json";
import Loading from "./Loading.vue";
import CommitHistory from "./CommitHistory.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";

// const GITHUB_CLIEN_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const GITHUB_CLIEN_ID = config.development.GITHUB_CLIEN_ID;
const GITHUB_CLIENT_SECRET = config.development.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = config.development.REDIRECT_URI;

export default {
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Loading,
    CommitHistory,
    ChevronDownIcon,
  },
  name: "HomeAccount",
  props: {},

  data() {
    return {
      config,
      search: "",
      isLoading: true,
      getRepo: repo,
      getCommit: [],
      getCommitBgJs: [],
      commitInfo: [],
      commitInfoBgJs: [],
      currentRepo: "",
      page: 1,
      code: this.$route.query.code,
    };
  },

  mounted() {
    this.getBgJsCommit();
    this.getCrudAgendaCommit();

    // this.requestGithubToken();
    // this.getRepoUser();
  },
  computed: {
    filterByName: function () {
      return this.getRepo.filter((repo) => {
        if (repo.name !== null) {
          return repo.name.toLowerCase().includes(this.search.toLowerCase());
        }
      });
    },
  },

  methods: {
    handleInfinityScroll(isVisible) {
      if (!isVisible) {
        return;
      }

      if (this.currentRepo === "beginner-javascript") {
        this.page++;
        this.getBgJsCommit();
        this.showCommitBgJs();
      }

      if (this.currentRepo === "crud_agenda") {
        this.page++;
        this.getCrudAgendaCommit();
        this.showCommit();
      }
    },

    showCommit(name) {
      this.currentRepo = name;

      this.getCommit.map((commitItem) => {
        const commitInfo = {
          hash: commitItem.sha,
          commitMessage: commitItem.commit.message,
          authorAvatar: commitItem.author ? commitItem.author.avatar_url : null,
          authorOfCommit: commitItem.commit.author.name,
          dateOfCommit: commitItem.commit.committer.date,
        };
        this.commitInfo.push(commitInfo);
      });
    },

    showCommitBgJs(name) {
      this.currentRepo = name;

      this.getCommitBgJs.map((commitItem) => {
        const commitInfo = {
          hash: commitItem.sha,
          commitMessage: commitItem.commit.message,
          authorAvatar: commitItem.author ? commitItem.author.avatar_url : null,
          authorOfCommit: commitItem.commit.author.name,
          dateOfCommit: commitItem.commit.committer.date,
        };
        this.commitInfoBgJs.push(commitInfo);
      });
    },

    async getBgJsCommit() {
      this.isLoading = false;
      await fetch(
        `https://api.github.com/repos/Azghour-Saad/beginner-javascript/commits?per_page=20&page=${this.page}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.getCommitBgJs.push(...data);
          this.isLoading = true;
        });
    },

    async getCrudAgendaCommit() {
      this.isLoading = false;
      await fetch(
        `https://api.github.com/repos/Azghour-Saad/crud_agenda/commits?per_page=20&page=${this.page}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.getCommit.push(...data);
          this.isLoading = true;
        });
    },

    async requestGithubToken() {
      const myInit = {
        method: "POST",
        headers: {
          // Accept: "application/json",   // Added from DOSC but the Response it's Same!
          "Content-Type": "application/json", //FIXME
        },
        mode: "no-cors",
      };

      const resToken = await fetch(
        `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIEN_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${GITHUB_CLIENT_SECRET}&code=${this.code}`,
        myInit
      );

      // Then i decide to work with my Own Private Data, Using POSTMAN & my access_token !
      console.log("resToken", resToken);

      // .then(({ access_token }) => {
      //   console.log("Response Access_token!!", access_token);
      // })
    },

    async getRepoUser() {
      const myInit = {
        method: "GET",
        headers: {
          // Here i use my token to get all my repo from Github API.
          // Authorization: `Bearer ${token}`,
        },

        mode: "no-cors",
      };

      const resRepo = await fetch(`https://api.github.com/user/repos`, myInit);

      console.log("repo res", resRepo);
    },

    getCode() {
      return this.$route.query.code;
    },
  },
};
</script>

<style scoped></style>
