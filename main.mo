shared ({ caller = creator }) actor class Reentrancy() {

  var i = 0;

  public shared func test() : async Text {

    let i0 = i;

    await foo();

    i += 1;

    let i1 = i;

    await foo();

    i += 1;

    let i2 = i;

    return "i0 = " # debug_show i0 # ", i1 = " # debug_show i1 # ", i2 = " # debug_show i2;
  };

  private func foo() : async () {
    ();
  };

};
