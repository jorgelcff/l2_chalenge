package com.desafio.entity;

public class Role {
  public enum RoleType {
    ADMIN,
    USER,
    GUEST
  }

  private RoleType roleType;

  public RoleType getRoleType() {
    return roleType;
  }

  public void setRoleType(RoleType roleType) {
    this.roleType = roleType;
  }
}
