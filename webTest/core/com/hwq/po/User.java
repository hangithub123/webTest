package com.hwq.po;

/**
 * User entity. @author MyEclipse Persistence Tools
 */

public class User implements java.io.Serializable {

	// Fields

	private String id;
	private String name;
	private Integer sex;

	// Constructors

	/** default constructor */
	public User() {
	}

	/** minimal constructor */
	public User(String id) {
		this.id = id;
	}

	/** full constructor */
	public User(String id, String name, Integer sex) {
		this.id = id;
		this.name = name;
		this.sex = sex;
	}

	// Property accessors

	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSex() {
		return this.sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

}