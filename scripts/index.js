import {
  availableCommandsWithInfo,
  commandNotfoundInfo,
} from "../data/commands.js";
import { skillsData } from "../data/skills.js";
import { socialsData } from "../data/socials.js";
import { projectsData, resumeLink } from "../data/projects.js";
import { aboutMe } from "../data/about.js";
// Input Focus Function
const commandInput = document.getElementById("command-input");
function focusInput() {
  commandInput.focus();
}
focusInput();

document.addEventListener("click", focusInput);

// INFO CREATION.
const infoContainer = document.getElementById("info");

function updateInfoContainerVisibility() {
  if (
    infoContainer.childNodes.length > 0 &&
    infoContainer.textContent.trim() !== ""
  ) {
    infoContainer.style.display = "flex";
  } else {
    infoContainer.style.display = "none";
  }
}
updateInfoContainerVisibility();

let contentAddedFirstTime = false;
// ---------------UTILS.----------------------------
function appendChildIntoParent(parent, child) {
  parent.appendChild(child);
}

function createSectionElement(className) {
  const sectionEle = document.createElement("section");
  if (className) {
    sectionEle.className = className;
  }
  return sectionEle;
}

function createDivElement(classNames, Id) {
  const divEle = document.createElement("div");

  if (classNames?.length > 0) {
    classNames.map((className) => {
      divEle.classList.toggle(className);
    });
  }
  if (Id) {
    divEle.id = Id;
  }
  return divEle;
}

function createParagraphElement(text, classNames, Id) {
  const paragraphEle = document.createElement("p");
  paragraphEle.innerHTML = text;
  if (classNames?.length > 0) {
    classNames.map((className) => {
      paragraphEle.classList.toggle(className);
    });
  }
  if (Id) {
    paragraphEle.id = Id;
  }
  return paragraphEle;
}

function createAnchorElement(link, text, classNames, Id) {
  const anchor = document.createElement("a");
  anchor.target = "_blank";
  anchor.href = link;

  anchor.textContent = text;

  if (classNames?.length > 0) {
    classNames.map((className) => {
      anchor.classList.toggle(className);
    });
  }
  if (Id) {
    anchor.id = Id;
  }
  return anchor;
}
function createH4Element(text, classNames, Id) {
  const h4 = document.createElement("h4");

  h4.textContent = text;

  if (classNames?.length > 0) {
    classNames.map((className) => {
      h4.classList.toggle(className);
    });
  }

  if (Id) {
    h4.id = Id;
  }
  return h4;
}
function createImageElement(link, alt, classNames, Id) {
  const img = document.createElement("img");
  img.src = link;
  img.alt = alt;
  if (classNames?.length > 0) {
    classNames.map((className) => {
      img.classList.toggle(className);
    });
  }
  if (Id) {
    img.id = Id;
  }
  return img;
}

function createHostUsernameCommandContainer(command) {
  const commandDiv = createDivElement(["command-text-container"]);

  const hostUsernameEle = createParagraphElement("sanjay@mike:", [
    "color-light-green",
    "font-size-14px",
    "font-size-20px",
  ]);
  const commandEle = createParagraphElement(command, [
    "font-size-14px",
    "font-size-20px",
  ]);

  appendChildIntoParent(commandDiv, hostUsernameEle);
  appendChildIntoParent(commandDiv, commandEle);
  return commandDiv;
}

// CREATES AVAILABLE COMMANDS INFO FOR HELP COMMAND.
function createAvailableCommandsInfo(command) {
  const commandsSection = createSectionElement(
    "flex-direction-column-row-gap-0-5rem",
  );
  appendChildIntoParent(
    commandsSection,
    createHostUsernameCommandContainer(command),
  );

  appendChildIntoParent(
    commandsSection,
    createParagraphElement("Available Commands: ", [
      "text-palevioletred",
      "padding-left-1rem",
    ]),
  );

  const commandsDiv = createDivElement(
    [
      "padding-left-1rem",
      "font-size-18px",
      "flex-direction-column-row-gap-0-5rem",
       "available-commands-div"
    ],
  
  );

  availableCommandsWithInfo.map((commandInfo) => {
    const { title, description } = commandInfo;
    const text = `<span class="text-palevioletred">${title}</span class="text-palevioletred"><span>- ${description}</span>`;

    appendChildIntoParent(commandsDiv, createParagraphElement(text));
  });
  appendChildIntoParent(commandsSection, commandsDiv);
  appendChildIntoParent(infoContainer, commandsSection);
}

// CREATES INFO FOR ABOUT COMMAND.

function createAboutInfo(command) {
  const aboutSection = createSectionElement(
    "flex-direction-column-row-gap-0-5rem",
  );
  appendChildIntoParent(
    aboutSection,
    createHostUsernameCommandContainer(command),
  );

  appendChildIntoParent(aboutSection,createParagraphElement(aboutMe,["padding-left-1rem"]));

  appendChildIntoParent(infoContainer,aboutSection);

}

// CREATES INFO FOR SKILLS COMMAND.
function createSkillsInfo(command) {
  const skillsSection = createSectionElement(
    "flex-direction-column-row-gap-0-5rem",
  );
  appendChildIntoParent(
    skillsSection,
    createHostUsernameCommandContainer(command),
  );

  skillsData?.map((skill) => {
    const individualSkillDiv = createDivElement([
      "flex-direction-column-row-gap-0-2rem",
      "padding-left-1rem",
    ]);

    appendChildIntoParent(
      individualSkillDiv,
      createH4Element(skill.title, ["text-palevioletred"]),
    );
    appendChildIntoParent(
      individualSkillDiv,
      createParagraphElement(skill.description),
    );
    appendChildIntoParent(skillsSection, individualSkillDiv);
  });

  appendChildIntoParent(infoContainer, skillsSection);
}

// CREATES INFO FOR PROJECTS COMMAND.
function createProjectsInfo(command) {
  const projectsSection = createSectionElement(
    "flex-direction-column-row-gap-0-5rem",
  );
  appendChildIntoParent(
    projectsSection,
    createHostUsernameCommandContainer(command),
  );

  projectsData?.map((project) => {
    const EachProjectTopLevelDiv = createDivElement(["flex-direction-column-row-gap-0-5rem","border-1-solid-white","border-radius-4","margin-top-1rem"],project.title);
    const projectTitleLinksDiv = createDivElement(["flex-direction-row","align-items-center","justify-between","padding-8","border-b-1-solid-white"]);
    const projectDescriptionPara = createParagraphElement(project.description,["padding-8","text-light-grey"]);
    const projectLinksDiv = createDivElement(["flex-direction-row","column-gap-1rem"]);

    appendChildIntoParent(projectTitleLinksDiv, createH4Element(project.title,["text-palevioletred"]));
    const githubAnchorElement = createAnchorElement(project.github,null,["display-inline-block","height-width-40","background-white","border-radius-50-percent"]);
    const projectLiveAnchorElement = createAnchorElement(project.live,null,["display-inline-block","height-width-40","background-white","border-radius-50-percent"]);

    appendChildIntoParent(
      githubAnchorElement,
      createImageElement("../assets/icons8-github-50.png","gitIcon"),
    );
    appendChildIntoParent(
      projectLiveAnchorElement,
      createImageElement("../assets/icons8-internet-50.png","liveIcon"),
    );
    appendChildIntoParent(projectLinksDiv, githubAnchorElement);
    appendChildIntoParent(projectLinksDiv, projectLiveAnchorElement);
    appendChildIntoParent(projectTitleLinksDiv, projectLinksDiv);
    appendChildIntoParent(EachProjectTopLevelDiv, projectTitleLinksDiv);
    appendChildIntoParent(EachProjectTopLevelDiv, projectDescriptionPara);

    appendChildIntoParent(projectsSection, EachProjectTopLevelDiv);
  });

  appendChildIntoParent(infoContainer, projectsSection);
}

// CREATES INFO FOR RESUME COMMAND.
function createResumeInfo(command) {
  const resumeSection  = createSectionElement(
    "flex-direction-column-row-gap-0-5rem",
  );
  appendChildIntoParent(
    resumeSection,
    createHostUsernameCommandContainer(command),
  );
  appendChildIntoParent(resumeSection,createParagraphElement("opening in new tab...",["padding-left-1rem"]))
  appendChildIntoParent(infoContainer, resumeSection);
  

  window.open(resumeLink,"_blank")
}

// CREATES INFO FOR SOCIALS COMMAND.
function createSocialsInfo(command) {
  const socialsSection = createSectionElement(
    "flex-direction-column-row-gap-0-5rem",
  );
  appendChildIntoParent(
    socialsSection,
    createHostUsernameCommandContainer(command),
  );

  socialsData?.map((social) => {
    const individualSocialDiv = createDivElement([
      "flex-direction-row",
      "padding-left-1rem",
      "align-items-center",
      "column-gap-2rem",
    ]);

    appendChildIntoParent(
      individualSocialDiv,
      createParagraphElement(social.title, [
        "font-size-14px",
        "font-size-18px",
        "socials-title-max-width",
      ]),
    );
    appendChildIntoParent(
      individualSocialDiv,
      createAnchorElement(social.link, social.username, ["text-orange"]),
    );
    appendChildIntoParent(socialsSection, individualSocialDiv);
  });
  appendChildIntoParent(infoContainer, socialsSection);
}

// CLEAR DATA INSIDE THE INFO CONTAINER.
function clearTerminal() {
  if (contentAddedFirstTime) {
    infoContainer.innerHTML = null;
    updateInfoContainerVisibility();
    contentAddedFirstTime = false;
  }
}

// CREATES INFO FOR THE COMMAND THAT IS NOT IN AVAILABLE COMMANDS.
function createNotCommandInfo(command) {
  const commandNotFoundSection = createSectionElement(
    "flex-direction-column-row-gap-0-5rem",
  );
  appendChildIntoParent(
    commandNotFoundSection,
    createHostUsernameCommandContainer(command),
  );
  commandNotfoundInfo?.map((statement) => {
    appendChildIntoParent(
      commandNotFoundSection,
      createParagraphElement(statement.title, statement.classes),
    );
  });

  appendChildIntoParent(infoContainer, commandNotFoundSection);
}

//WILL FIND THE COMMAND AND CREATE RESPECTIVE INFO USING DATA FOLDER.
function findCommandAndCreateInfo(command) {
  switch (command) {
    case "about":
      createAboutInfo(command);
      break;
    case "skills":
      createSkillsInfo(command);
      break;
    case "projects":
      createProjectsInfo(command);
      break;
    case "resume":
      createResumeInfo(command);
      break;
    case "socials":
      createSocialsInfo(command);
      break;
    case "clear":
      clearTerminal();
      break;
    case "help":
      createAvailableCommandsInfo(command);
      break;
    default:
      createNotCommandInfo(command);
  }
}

// EVENTLISTNER FOR ON-ENTER.
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = commandInput.value;
    findCommandAndCreateInfo(command.toLowerCase());
    if (!contentAddedFirstTime && command.toLowerCase() !== "clear") {
      updateInfoContainerVisibility();
      contentAddedFirstTime = true;
    }
    commandInput.value = "";
  }
});
