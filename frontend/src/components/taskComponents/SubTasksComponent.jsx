import React from "react";
import "./toDoComponents/styles/subtasks.css";

export default function SubTasksComponent() {
  return (
    <div>
      <div className="input-container">
        <input type="text" placeholder="Add a new ToDo..." />
        <button className="add-btn">
          <span class="material-symbols-outlined">add_circle</span>
          <p> Add</p>
        </button>
      </div>
      <div className="subtasks-list">
        <div className="subtask">
          <div class="checkbox-wrapper-42">
            <input id="cbx-42" type="checkbox" />
            <label class="cbx" for="cbx-42"></label>
            <label class="lbl" for="cbx-42">
              Magic
            </label>
          </div>
          <span>X</span>
        </div>
        {/* ****************************** */}
        {/* ****************************** */}
        {/* ****************************** */}
        <div className="subtask">
          <div class="checkbox-wrapper-42">
            <input id="cbx-42" type="checkbox" />
            <label class="cbx" for="cbx-42"></label>
            <label class="lbl" for="cbx-42">
              Magic
            </label>
          </div>
          <p>X</p>
        </div>
        {/* ****************************** */}
        {/* ****************************** */}
        {/* ****************************** */}
        <div className="subtask">
          <div class="checkbox-wrapper-42">
            <input id="cbx-42" type="checkbox" />
            <label class="cbx" for="cbx-42"></label>
            <label class="lbl" for="cbx-42">
              Magic
            </label>
          </div>
          <p>X</p>
        </div>
        {/* ****************************** */}
        {/* ****************************** */}
        {/* ****************************** */}
        <div className="subtask">
          <div class="checkbox-wrapper-42">
            <input id="cbx-42" type="checkbox" />
            <label class="cbx" for="cbx-42"></label>
            <label class="lbl" for="cbx-42">
              Magic
            </label>
          </div>
          <p>X</p>
        </div>
        {/* ****************************** */}
        {/* ****************************** */}
        {/* ****************************** */}
        <div className="subtask">
          <div class="checkbox-wrapper-42">
            <input id="cbx-42" type="checkbox" />
            <label class="cbx" for="cbx-42"></label>
            <label class="lbl" for="cbx-42">
              Magic
            </label>
          </div>
          <p>X</p>
        </div>
      </div>
    </div>
  );
}
