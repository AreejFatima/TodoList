const SearchBar = (props: any) => (
    <div>
      <input
        className="form-control mb-2"
        style={{
          width: "30%",
          marginLeft: "35%",
          border: "2px solid black",
          marginTop: "1%",
        }}
        placeholder="Search ....."
        onChange={(event) => props.update(event)}
      />
    </div>
  );
  
  export default SearchBar;
