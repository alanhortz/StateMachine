describe("A door", function() {
  var myDoor;

  beforeEach(function() {
    myDoor = door();
  });

  it("has a state name", function() {
    expect(myDoor.getStateName()).toBeDefined();
  });

  describe("when created", function() {
    it("is not locked", function() {
      expect(myDoor.isLocked()).toBe(false);
    });
    it("is open", function() {
      expect(myDoor.getStateName()).toMatch("Open");
    });
    it("can be closed", function() {
      myDoor.close();
      expect(myDoor.getStateName()).toMatch("Closed");
    });
    it("can be locked", function() {
      myDoor.lock();
      expect(myDoor.isLocked()).toBe(true);
    });
  });

  describe("when open and locked", function() {
    it("cannot be closed", function() {
      myDoor.lock();
      myDoor.close();
      expect(myDoor.getStateName()).toMatch("Open");
    });
  });

  describe("when closed and locked", function() {
    it("cannot be opened", function() {
      myDoor.close();
      myDoor.lock();  
      expect(myDoor.getStateName()).toMatch("Closed");      
    });
  });
});

